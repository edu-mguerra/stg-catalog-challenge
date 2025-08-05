"use client"

import Image from "next/image"
import { useEffect, useState, use } from "react"
import { supabase } from "../../../lib/supaBase"
import MapCatalog from "@/components/mapProdutos"
import { Header } from "@/components/header";
import { addToCart } from "@/utils/cartActions";


type Props = {
    id: string
}

type PropsType = {
    params: Promise<Props>
}

export default function ProductPage({ params }: PropsType) {
    const { id } = use(params)

    const [product, setProduct] = useState<any>(null)
    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true)




    useEffect(() => {
        const fetchData = async () => {
            const { data: productData, error: productError } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            const { data: allProducts, error: allError } = await supabase
                .from("products")
                .select("*");

            if (!productError && productData) setProduct(productData);
            if (!allError && allProducts) {
                setProducts(allProducts);

                // Extrai categorias únicas e ordena
                const cats = Array.from(new Set(allProducts.map(p => p.category))).sort();
                setCategories(cats);
            }

            setLoading(false);
        };



        fetchData()
    }, [id])

    if (loading) return <p className="p-10">Carregando...</p>
    if (!product) return <p className="p-10 text-red-500">Produto não encontrado.</p>

    return (
        <>
            <Header />
            <div className="bg-sky-700 w-full px-4 py-10 pt-28 min-h-screen">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Imagem */}
                    <div className="flex justify-center">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                width={400}
                                height={400}
                                className="rounded-xl object-cover shadow-lg border border-white/20"
                            />
                        ) : (
                            <div className="w-80 h-80 bg-white/10 rounded-xl flex items-center justify-center text-white">
                                Sem imagem
                            </div>
                        )}
                    </div>

                    {/* Card com efeito de vidro */}
                    <div className="flex flex-col gap-4 text-white p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                        <h1 className="text-4xl font-bold drop-shadow">{product.name}</h1>
                        <p className="text-base leading-relaxed">{product.description}</p>
                        <p className="text-2xl font-semibold text-sky-300">
                            R$ {product.price.toFixed(2)}
                        </p>

                        <button
                            onClick={() => {
                                console.log("Cliquei no botão - product.id:", product.id);
                                addToCart(product.id);

                            }}
                            className="bg-white  text-sky-500 font-bold  px-4 py-2 rounded transition"
                        >
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>

                {/* Veja também */}
                <h2 className="text-white text-center text-3xl font-semibold mt-16 mb-6 drop-shadow">
                    Veja também:
                </h2>
                <MapCatalog products={products} categories={categories} />
            </div>
        </>
    );

}
