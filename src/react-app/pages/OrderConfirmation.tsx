import { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { CheckCircle, Package } from "lucide-react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");
  const isPaid = searchParams.get("paid") === "true";

  useEffect(() => {
    // Clear session storage after successful order
    localStorage.removeItem("sessionId");
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header cartItemCount={0} />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isPaid ? "Payment Confirmed!" : "Order Placed!"}
          </h1>

          <p className="text-white/80 text-lg mb-8">
            {isPaid 
              ? "Thank you for your payment. We'll now procure your items and arrange delivery to your address."
              : "Thank you for your order. Please complete payment to begin the procurement process."
            }
          </p>

          {orderNumber && (
            <div className="bg-zinc-900 rounded-lg p-8 border border-white/10 mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Package className="w-6 h-6 text-red-500" />
                <span className="text-white/60 text-sm font-medium">
                  Order Number
                </span>
              </div>
              <div className="text-3xl font-bold text-white tracking-wider">
                {orderNumber}
              </div>
            </div>
          )}

          <div className="bg-zinc-900 rounded-lg p-6 border border-white/10 mb-8">
            <h2 className="text-white font-semibold text-lg mb-3">
              {isPaid ? "What Happens Next" : "Next Steps"}
            </h2>
            {isPaid ? (
              <ul className="text-white/60 text-left space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Payment Received</strong>
                    <p className="text-sm">Your payment has been processed successfully</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1 font-bold">1.</span>
                  <div>
                    <strong className="text-white">We Order from Supplier</strong>
                    <p className="text-sm">We'll procure your items from our supplier (3-5 business days)</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1 font-bold">2.</span>
                  <div>
                    <strong className="text-white">Quality Check & Packaging</strong>
                    <p className="text-sm">Items inspected and prepared for delivery (1-2 business days)</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1 font-bold">3.</span>
                  <div>
                    <strong className="text-white">Delivery to You</strong>
                    <p className="text-sm">Direct delivery to your address (2-3 business days)</p>
                  </div>
                </li>
              </ul>
            ) : (
              <>
                <ul className="text-white/60 text-left space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1 font-bold">1.</span>
                    <div>
                      <strong className="text-white">Complete Payment</strong>
                      <p className="text-sm">Pay via EFT to our Nedbank account or arrange cash payment</p>
                      <p className="text-sm text-yellow-400 mt-1">Use your order number as reference</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1 font-bold">2.</span>
                    <div>
                      <strong className="text-white">We Order from Supplier</strong>
                      <p className="text-sm">Once payment is confirmed, we procure your items (3-5 business days)</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1 font-bold">3.</span>
                    <div>
                      <strong className="text-white">We Deliver to You</strong>
                      <p className="text-sm">Direct delivery to your address (2-3 business days after procurement)</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-blue-300 text-sm">
                      <strong>Payment Details:</strong> We'll send you an email with banking details and payment instructions. Please complete payment within 24 hours to secure your order.
                    </p>
                  </div>
                </div>
              </>
            )}
            {isPaid && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/80 text-sm">
                  <strong>Estimated total time:</strong> 7-10 business days
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
