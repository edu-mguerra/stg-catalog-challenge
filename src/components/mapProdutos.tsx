"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/utils/cartActions";




type Products = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
};

type MapProducts = {
  products: Products[];
  categories: string[];
};

export default function MapCatalog({ products, categories }: MapProducts) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [addingMap, setAddingMap] = useState<{ [key: string]: boolean }>({});


  const handleAddToCart = async (productId: string) => {
    setAddingMap((prev) => ({ ...prev, [productId]: true }));
    await addToCart(productId);

       setTimeout(() => {
             setAddingMap((prev) => ({ ...prev, [productId]: false }));
        }, 1000);
  };



  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-sky-700 min-h-screen">
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="category" className="font-semibold text-white">
          Filtrar por categoria:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 bg-gray-800 text-white"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-gray-800 text-white">
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:shadow-lg transition hover:scale-[1.02] p-4 flex flex-col h-full cursor-pointer"
          >
            {product.image_url ? (
              <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       25vw"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-700 rounded-md flex items-center justify-center text-gray-400 mb-4">
                Sem imagem
              </div>
            )}

            <h2 className="text-lg font-semibold text-white line-clamp-1">{product.name}</h2>
            <p className="text-sky-400 font-bold mt-1 text-lg">R$ {product.price.toFixed(2)}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="bg-white text-sky-500 font-bold px-4 py-2 rounded transition"
                disabled={addingMap[product.id]}
              >
                {addingMap[product.id] ? "Adicionando..." : "Adicionar ao carrinho"}
              </button>

              {addingMap[product.id] && (
                <p className="text-white mt-2 text-sm">Adicionando ao carrinho...</p>
              )}

              <Link href={`/${product.id}`}>
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded transition">
                  Ver Produto
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


}
