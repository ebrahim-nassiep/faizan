import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import ProductCard from "@/react-app/components/ProductCard";
import { useCart } from "@/react-app/hooks/useCart";
import type { Product, Category } from "@/shared/types";

interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  is_featured: boolean;
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalItems } = useCart();

  const categorySlug = searchParams.get("category") || "";
  const collectionSlug = searchParams.get("collection") || "";

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
      
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "/api/products";
    
    if (categorySlug) {
      url = `/api/products?category=${categorySlug}`;
    } else if (collectionSlug) {
      url = `/api/products?collection=${collectionSlug}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [categorySlug, collectionSlug]);

  const currentCategory = categories.find((c) => c.slug === categorySlug);
  const currentCollection = collections.find((c) => c.slug === collectionSlug);

  return (
    <div className="min-h-screen bg-black">
      <Header cartItemCount={totalItems} />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {currentCollection 
              ? currentCollection.name 
              : currentCategory 
              ? currentCategory.name 
              : "All Products"}
          </h1>
          {currentCollection && (
            <p className="text-white/60 text-lg">{currentCollection.description}</p>
          )}
          {currentCategory && !currentCollection && (
            <p className="text-white/60 text-lg">{currentCategory.description}</p>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* All Products Button */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSearchParams({})}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                !categorySlug && !collectionSlug
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              All Products
            </button>
          </div>
          
          {/* Kixx Collections */}
          {collections.length > 0 && (
            <div>
              <h3 className="text-white/80 font-semibold mb-3 text-sm">Kixx Collections</h3>
              <div className="flex flex-wrap gap-3">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => setSearchParams({ collection: collection.slug })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      collectionSlug === collection.slug
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white/60 hover:bg-white/20"
                    }`}
                  >
                    {collection.name.replace('Kixx ', '')}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Categories */}
          <div>
            <h3 className="text-white/80 font-semibold mb-3 text-sm">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSearchParams({ category: category.slug })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    categorySlug === category.slug
                      ? "bg-red-500 text-white"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
