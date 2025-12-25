import { Link } from "react-router";
import type { Product } from "@/shared/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative bg-zinc-900 rounded-lg overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
    >
      <div className="aspect-square overflow-hidden bg-zinc-800">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-white/60 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">
            R{product.price.toFixed(2)}
          </span>
          
          {product.stock_quantity > 0 ? (
            <span className="text-green-400 text-sm font-medium">In Stock</span>
          ) : (
            <span className="text-red-400 text-sm font-medium">Out of Stock</span>
          )}
        </div>
      </div>
      
      {product.is_featured === 1 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          FEATURED
        </div>
      )}
    </Link>
  );
}
