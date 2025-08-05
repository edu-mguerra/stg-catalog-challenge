'use client';

import { Header } from "@/components/header";
import MapCatalog from "@/components/mapProdutos";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supaBase";

import Image from "next/image";



export default function Catalog() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState<string[]>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error }: any | null = await supabase.from('products').select('*')
      if (error) console.log('erro: ', error)
      else {
        setProducts(data)
        const cats: any = Array.from(new Set(data.map((p: any) => p.category))).sort();
        setCategories(cats);
      }

    }
    fetchProducts()
  }, [])







  return (
    <div className="bg-sky-700 min-h-screen w-full pt-20">
      <Header />

      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="relative max-w-6xl mx-auto h-64 md:h-96 rounded-lg overflow-hidden hover:shadow-lg border border-white/10">
          <Image
            src="/3.jpg"
            alt="Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Nosso Catálogo</h1>
            <p className="mb-6 text-lg md:text-xl">Explore os produtos disponíveis e aproveite!</p>

          </div>
        </div>



        <MapCatalog products={products} categories={categories} />
      </div>
    </div>
  );

}