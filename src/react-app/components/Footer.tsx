import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
              COMBAT CULTURE
            </div>
            <p className="text-white/60 text-sm">
              Premium martial arts gear and apparel for fighters
            </p>
          </div>

          {/* Kixx Collections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kixx Collections</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="/shop?collection=kixx-boxing" className="hover:text-white transition-colors">
                  Boxing Collection
                </a>
              </li>
              <li>
                <a href="/shop?collection=kixx-muay-thai" className="hover:text-white transition-colors">
                  Muay Thai Collection
                </a>
              </li>
              <li>
                <a href="/shop?collection=kixx-training" className="hover:text-white transition-colors">
                  Training Collection
                </a>
              </li>
              <li>
                <a href="/shop?collection=kixx-protection" className="hover:text-white transition-colors">
                  Protection Collection
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} Combat Culture. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
