"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supaBase";
import Banner from "@/components/banner";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(4);

      if (error) {
        console.error("Erro ao buscar produtos:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto px-4 py-10 space-y-14 bg-gradient-to-b from-sky-800 to-sky-950 min-h-screen text-white">
      
      {/* Banner */}
      <Banner/>

      {/* Produtos */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Produtos em destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href="/login" key={product.id}>
              <div className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:shadow-lg transition hover:scale-[1.02] p-4 flex flex-col h-full">
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                <p className="text-gray-300 text-sm line-clamp-2 mb-2">{product.description}</p>
                <div className="mt-auto text-sky-400 font-bold text-lg">
                  R$ {product.price.toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
