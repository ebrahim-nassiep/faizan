import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import Stripe from "stripe";

const app = new Hono<{ Bindings: Env }>();

// Categories API
app.get("/api/categories", async (c) => {
  const db = c.env.DB;
  const categories = await db.prepare("SELECT * FROM categories ORDER BY name").all();
  return c.json(categories.results);
});

// Products API
app.get("/api/products", async (c) => {
  const db = c.env.DB;
  const categorySlug = c.req.query("category");
  const featured = c.req.query("featured");
  
  let query = "SELECT * FROM products";
  const params: (string | number)[] = [];
  
  if (categorySlug) {
    query += " WHERE category_id = (SELECT id FROM categories WHERE slug = ?)";
    params.push(categorySlug);
  } else if (featured === "true") {
    query += " WHERE is_featured = 1";
  }
  
  query += " ORDER BY created_at DESC";
  
  const products = await db.prepare(query).bind(...params).all();
  return c.json(products.results);
});

app.get("/api/products/:slug", async (c) => {
  const db = c.env.DB;
  const slug = c.req.param("slug");
  
  const product = await db.prepare("SELECT * FROM products WHERE slug = ?").bind(slug).first();
  
  if (!product) {
    return c.json({ error: "Product not found" }, 404);
  }
  
  return c.json(product);
});

// Cart API
const addToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
  size: z.string().optional(),
  color: z.string().optional(),
});

app.post("/api/cart", zValidator("json", addToCartSchema), async (c) => {
  const db = c.env.DB;
  const { productId, quantity, size, color } = c.req.valid("json");
  
  // Get or create session ID from cookie
  const sessionId = c.req.header("X-Session-Id") || crypto.randomUUID();
  
  // Check if item already exists in cart
  const existing = await db.prepare(
    "SELECT * FROM cart_items WHERE session_id = ? AND product_id = ? AND size = ? AND color = ?"
  ).bind(sessionId, productId, size || "", color || "").first();
  
  if (existing) {
    // Update quantity
    await db.prepare(
      "UPDATE cart_items SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(quantity, existing.id).run();
  } else {
    // Insert new item
    await db.prepare(
      "INSERT INTO cart_items (session_id, product_id, quantity, size, color) VALUES (?, ?, ?, ?, ?)"
    ).bind(sessionId, productId, quantity, size || "", color || "").run();
  }
  
  const response = c.json({ success: true, sessionId });
  response.headers.set("X-Session-Id", sessionId);
  return response;
});

app.get("/api/cart", async (c) => {
  const db = c.env.DB;
  const sessionId = c.req.header("X-Session-Id");
  
  if (!sessionId) {
    return c.json([]);
  }
  
  const items = await db.prepare(`
    SELECT ci.*, p.name, p.price, p.image_url
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.session_id = ?
    ORDER BY ci.created_at DESC
  `).bind(sessionId).all();
  
  return c.json(items.results);
});

app.delete("/api/cart/:id", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  const sessionId = c.req.header("X-Session-Id");
  
  await db.prepare(
    "DELETE FROM cart_items WHERE id = ? AND session_id = ?"
  ).bind(id, sessionId).run();
  
  return c.json({ success: true });
});

const updateCartItemSchema = z.object({
  quantity: z.number().min(1),
});

app.patch("/api/cart/:id", zValidator("json", updateCartItemSchema), async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  const { quantity } = c.req.valid("json");
  const sessionId = c.req.header("X-Session-Id");
  
  await db.prepare(
    "UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND session_id = ?"
  ).bind(quantity, id, sessionId).run();
  
  return c.json({ success: true });
});

// Create Stripe Payment Intent
app.post("/api/create-payment-intent", async (c) => {
  const db = c.env.DB;
  const sessionId = c.req.header("X-Session-Id");
  
  if (!sessionId) {
    return c.json({ error: "No items in cart" }, 400);
  }
  
  // Get cart items
  const items = await db.prepare(`
    SELECT ci.*, p.name, p.price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.session_id = ?
  `).bind(sessionId).all();
  
  if (!items.results || items.results.length === 0) {
    return c.json({ error: "Cart is empty" }, 400);
  }
  
  // Calculate total amount in cents (Stripe uses cents)
  const totalAmount = items.results.reduce((sum: number, item: unknown) => {
    const cartItem = item as { price: number; quantity: number };
    return sum + (cartItem.price * cartItem.quantity);
  }, 0);
  
  const amountInCents = Math.round(totalAmount * 100);
  
  try {
    const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    });
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "zar",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return c.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});

// Checkout API
const checkoutSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(10),
  paymentIntentId: z.string().optional(),
  paymentMethod: z.enum(["stripe", "cash", "eft"]),
});

app.post("/api/checkout", zValidator("json", checkoutSchema), async (c) => {
  const db = c.env.DB;
  const sessionId = c.req.header("X-Session-Id");
  const { customerName, customerEmail, customerPhone, shippingAddress, paymentIntentId, paymentMethod } = c.req.valid("json");
  
  if (!sessionId) {
    return c.json({ error: "No items in cart" }, 400);
  }
  
  // Get cart items
  const items = await db.prepare(`
    SELECT ci.*, p.name, p.price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.session_id = ?
  `).bind(sessionId).all();
  
  if (!items.results || items.results.length === 0) {
    return c.json({ error: "Cart is empty" }, 400);
  }
  
  // Calculate total
  const totalAmount = items.results.reduce((sum: number, item: unknown) => {
    const cartItem = item as { price: number; quantity: number };
    return sum + (cartItem.price * cartItem.quantity);
  }, 0);
  
  // Verify Stripe payment if using Stripe
  if (paymentMethod === "stripe" && paymentIntentId) {
    try {
      const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-12-15.clover",
      });
      
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== "succeeded") {
        return c.json({ error: "Payment not completed" }, 400);
      }
    } catch {
      return c.json({ error: "Payment verification failed" }, 500);
    }
  }
  
  // Generate order number
  const orderNumber = `FZ${Date.now()}`;
  
  // Determine payment status
  const paymentStatus = paymentMethod === "stripe" ? "paid" : "pending";
  
  // Create order
  const orderResult = await db.prepare(
    "INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, total_amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).bind(orderNumber, customerName, customerEmail, customerPhone || "", shippingAddress, totalAmount, paymentStatus).run();
  
  const orderId = orderResult.meta.last_row_id;
  
  // Create order items
  for (const item of items.results as Array<{
    product_id: number;
    name: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }>) {
    await db.prepare(
      "INSERT INTO order_items (order_id, product_id, product_name, quantity, price, size, color) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(orderId, item.product_id, item.name, item.quantity, item.price, item.size || "", item.color || "").run();
  }
  
  // Clear cart
  await db.prepare("DELETE FROM cart_items WHERE session_id = ?").bind(sessionId).run();
  
  return c.json({ success: true, orderNumber, orderId });
});

export default app;
