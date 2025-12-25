import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { useCart } from "@/react-app/hooks/useCart";

function OtherPaymentForm({ 
  formData, 
  onFormChange,
  paymentMethod,
  onSuccess 
}: { 
  formData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    totalPrice: number;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  paymentMethod: "cash" | "eft";
  onSuccess: (orderNumber: string, isPaid?: boolean) => void;
}) {
  const { sessionId } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": sessionId,
        },
        body: JSON.stringify({
          ...formData,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data.orderNumber);
      } else {
        setError(data.error || "Failed to process order");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-zinc-900 rounded-lg p-6 border border-white/10">
        <h2 className="text-white font-bold text-xl mb-6">Contact Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2 font-medium">
              Full Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={onFormChange}
              required
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-medium">
              Email *
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={onFormChange}
              required
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={onFormChange}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {paymentMethod === "eft" && (
        <div className="bg-black/50 border border-white/20 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">Nedbank Banking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Bank:</span>
              <span className="text-white font-medium">Nedbank</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Account Name:</span>
              <span className="text-white font-medium">Faizan Apparel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Account Number:</span>
              <span className="text-white font-medium">Contact for details</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Reference:</span>
              <span className="text-white font-medium">Your order number</span>
            </div>
          </div>
          <p className="text-yellow-400 text-xs mt-3">
            Please use your order number as payment reference and email proof of payment to confirm.
          </p>
        </div>
      )}

      {paymentMethod === "cash" && (
        <div className="bg-black/50 border border-white/20 rounded-lg p-4">
          <p className="text-white/80 text-sm">
            Cash payment can be arranged upon collection or delivery. We'll contact you to coordinate payment and delivery details.
          </p>
        </div>
      )}

      <div className="bg-zinc-900 rounded-lg p-6 border border-white/10">
        <h2 className="text-white font-bold text-xl mb-6">Shipping Address</h2>

        <div>
          <label className="block text-white/80 mb-2 font-medium">
            Full Address *
          </label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={onFormChange}
            required
            rows={4}
            placeholder="Street address, city, state, zip code, country"
            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
        <p className="text-blue-300 text-sm">
          <strong>Important:</strong> Payment is required upfront ({paymentMethod === "eft" ? "via EFT to Nedbank" : "in cash"}). Once payment is confirmed, we will order your items from our supplier and arrange delivery.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Check className="w-5 h-5" />
            <span>Confirm Order</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, totalItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "eft">("eft");
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    totalPrice,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, totalPrice }));
  }, [totalPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSuccess = (orderNumber: string, isPaid: boolean = false) => {
    navigate(`/order-confirmation?order=${orderNumber}&paid=${isPaid}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Header cartItemCount={0} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate("/shop")}
            className="text-red-400 hover:text-red-300"
          >
            Return to shop
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header cartItemCount={totalItems} />

      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/cart")}
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to cart</span>
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Checkout</h1>
        
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-red-500" />
            How Our Process Works
          </h2>
          <div className="text-white/80 leading-relaxed space-y-2">
            <p><strong className="text-white">1. Payment Upfront:</strong> Pay via cash or EFT to Nedbank</p>
            <p><strong className="text-white">2. Procurement:</strong> We order your items from our supplier</p>
            <p><strong className="text-white">3. Delivery:</strong> We deliver directly to your address</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Payment Method Selection */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-white/10 mb-6">
              <h2 className="text-white font-bold text-xl mb-6">Payment Method</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("eft")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "eft"
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-black/50 hover:border-white/40"
                  }`}
                >
                  <div className="text-white font-semibold mb-1">EFT / Bank Transfer</div>
                  <div className="text-white/60 text-sm">Nedbank</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "cash"
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-black/50 hover:border-white/40"
                  }`}
                >
                  <div className="text-white font-semibold mb-1">Cash</div>
                  <div className="text-white/60 text-sm">Pay on collection</div>
                </button>
              </div>
              <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-300 text-sm">
                  <strong>Note:</strong> Card payment via Stripe will be available soon. For now, please use EFT or Cash payment options.
                </p>
              </div>
            </div>

            {/* Render appropriate form based on payment method */}
            <OtherPaymentForm 
              formData={formData}
              onFormChange={handleChange}
              paymentMethod={paymentMethod}
              onSuccess={handleSuccess}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-lg p-6 border border-white/10 sticky top-24">
              <h2 className="text-white font-bold text-2xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      <p className="text-white/60 text-xs">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && " • "}
                        {item.color && `Color: ${item.color}`}
                      </p>
                      <p className="text-white/60 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-white font-semibold">
                      R{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">
                    R{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery</span>
                  <span className="text-green-400 font-semibold">Included</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total Due Now</span>
                    <span>R{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-white/50 text-xs pt-2">
                  Payment required before procurement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
