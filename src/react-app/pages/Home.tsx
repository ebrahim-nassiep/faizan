import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Shield, Truck, Award } from "lucide-react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import ProductCard from "@/react-app/components/ProductCard";
import { useCart } from "@/react-app/hooks/useCart";
import type { Product, Category } from "@/shared/types";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { totalItems } = useCart();

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data));

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header cartItemCount={totalItems} />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            FIGHT WITH STYLE
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
            Premium kickboxing and Muay Thai apparel for champions
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-white/60 text-sm">
                Professional grade equipment trusted by fighters worldwide
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Fast Shipping</h3>
              <p className="text-white/60 text-sm">
                Quick delivery to get you training sooner
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Champion Approved</h3>
              <p className="text-white/60 text-sm">
                Used by professional fighters and trainers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.slug}`}
                className="group relative h-64 rounded-lg overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image_url}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">{category.description}</p>
                  <span className="text-red-400 font-semibold inline-flex items-center space-x-1">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
