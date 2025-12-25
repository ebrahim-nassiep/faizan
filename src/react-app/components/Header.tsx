import { Link } from "react-router";
import { ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              FAIZAN
            </div>
            <div className="text-sm text-white/60 font-light">APPAREL</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Shop
            </Link>
            <Link
              to="/shop?category=shorts"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Shorts
            </Link>
            <Link
              to="/shop?category=gloves"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Gloves
            </Link>
            <Link
              to="/shop?category=tops"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Tops
            </Link>
            <Link
              to="/shop?category=kixx-equipment"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Kixx
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-white/80 hover:text-white transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/shop?category=shorts"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shorts
              </Link>
              <Link
                to="/shop?category=gloves"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gloves
              </Link>
              <Link
                to="/shop?category=tops"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tops
              </Link>
              <Link
                to="/shop?category=kixx-equipment"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kixx
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
