import { Link } from "react-router";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { useCart } from "@/react-app/hooks/useCart";

export default function CartPage() {
  const { cart, loading, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header cartItemCount={totalItems} />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shopping Cart</h1>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue shopping</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/60 mb-8">Add some items to get started</p>
            <Link
              to="/shop"
              className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900 rounded-lg p-6 border border-white/10 flex flex-col sm:flex-row gap-6"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{item.name}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                      {item.size && (
                        <span>
                          Size: <span className="text-white font-medium">{item.size}</span>
                        </span>
                      )}
                      {item.color && (
                        <span>
                          Color: <span className="text-white font-medium">{item.color}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded bg-white/10 text-white hover:bg-white/20 transition-all"
                        >
                          -
                        </button>
                        <span className="text-white font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded bg-white/10 text-white hover:bg-white/20 transition-all"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-white font-bold text-xl">
                          R{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 rounded-lg p-6 border border-white/10 sticky top-24">
                <h2 className="text-white font-bold text-2xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="text-white font-semibold">
                      R{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span className="text-green-400 font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-white text-xl font-bold">
                      <span>Total</span>
                      <span>R{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-red-500/50 transition-all"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
