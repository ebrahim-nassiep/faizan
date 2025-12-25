import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { useCart } from "@/react-app/hooks/useCart";
import type { Product } from "@/shared/types";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { totalItems, addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      fetch(`/api/products/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          
          // Parse and set default selections
          if (data.sizes) {
            const sizes = JSON.parse(data.sizes);
            if (sizes.length > 0) setSelectedSize(sizes[0]);
          }
          if (data.colors) {
            const colors = JSON.parse(data.colors);
            if (colors.length > 0) setSelectedColor(colors[0]);
          }
          
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    const result = await addToCart(
      product.id,
      quantity,
      selectedSize,
      selectedColor
    );

    if (result.success) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black">
        <Header cartItemCount={totalItems} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product not found</h1>
          <Link to="/shop" className="text-red-400 hover:text-red-300">
            Return to shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const sizes = product.sizes ? JSON.parse(product.sizes) : [];
  const colors = product.colors ? JSON.parse(product.colors) : [];

  return (
    <div className="min-h-screen bg-black">
      <Header cartItemCount={totalItems} />

      <div className="container mx-auto px-4 py-12">
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="rounded-lg overflow-hidden bg-zinc-900 border border-white/10">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
            <div className="text-3xl font-bold text-red-500 mb-6">
              R{product.price.toFixed(2)}
            </div>

            {product.description && (
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">Size</label>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? "bg-red-500 text-white"
                          : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">Color</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? "bg-red-500 text-white"
                          : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-3">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
                >
                  -
                </button>
                <span className="text-white text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-2 ${
                product.stock_quantity === 0
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : addedToCart
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/50"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </span>
                </>
              )}
            </button>

            {/* Stock Info */}
            <div className="mt-6 text-center">
              {product.stock_quantity > 0 ? (
                <p className="text-green-400 text-sm">
                  {product.stock_quantity} items in stock
                </p>
              ) : (
                <p className="text-red-400 text-sm">Currently out of stock</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
