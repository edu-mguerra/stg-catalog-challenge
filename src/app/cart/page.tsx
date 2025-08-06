'use client'

import { useEffect, useState } from "react";

import Image from "next/image";
import { fetchCartItems } from "@/utils/cartActions";
import { supabase } from "../../../lib/supaBase";
import { Header } from "@/components/header";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const removeFromCart = async (id: string) => {
    // Remove do banco
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao remover item do carrinho no banco:", error);
      return;
    }

    // Atualiza estado local
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", itemId);

    if (error) {
      console.log(error);
      return;
    }


    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };






  useEffect(() => {
    const loadCart = async () => {
      const data = await fetchCartItems();
      setCartItems(data);
      setLoading(false);
    };

    loadCart();
  }, []);

  if (loading) return <p className="text-center mt-20">Carregando...</p>;
  if (cartItems.length === 0) return <div className="bg-sky-700 min-h-screen pt-24 px-4"><p className="text-center mt-20">Seu carrinho está vazio.</p></div>;

  const total = cartItems.reduce((acc, item) => {
    return acc + item.products.price * item.quantity;
  }, 0);


  const handleWhatsAppCheckout = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Usuário não autenticado");
      return;
    }

    const phone = "558792020340";

    const message = `🛒 NOVO PEDIDO - STG CATALOG
👤 Cliente: ${user.user_metadata?.name || user.email}
📧 Email: ${user.email}

📦 PRODUTOS:
${cartItems
        .map(
          (item) =>
            `- ${item.products.name} - Qtd: ${item.quantity} - R$ ${(item.products.price * item.quantity).toFixed(2)}`
        )
        .join("\n")}

🧾 TOTAL: R$ ${total.toFixed(2)}
---
Pedido via STG Catalog`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Erro ao limpar carrinho:", error);
    } else {
      
      fetchCartItems(); 
    }

  };



  return (
    <>
      <Header />
      <div className="bg-sky-700 min-h-screen pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-white drop-shadow">
            Seu Carrinho
          </h1>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-md"
              >
                {item.products.image_url ? (
                  <Image
                    src={item.products.image_url}
                    alt={item.products.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover shadow"
                  />
                ) : (
                  <div className="w-20 h-20 bg-white/10 flex items-center justify-center rounded-md text-white text-sm">
                    Sem imagem
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">
                    {item.products.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-white/20 text-white px-2 py-1 rounded hover:bg-white/30 transition text-lg font-bold"
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-white/20 text-white px-2 py-1 rounded hover:bg-white/30 transition text-lg font-bold"
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-white/80">
                    Preço:{" "}
                    <span className="text-sky-400 font-medium">
                      R$ {(item.products.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition shadow"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow">
            <p className="text-xl font-bold text-white">
              Total: <span className="text-sky-400">R$ {total.toFixed(2)}</span>
            </p>


          </div>



          <div>
            <button
              onClick={handleWhatsAppCheckout}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow mt-4 transition"
            >
              Finalizar pedido pelo WhatsApp
            </button>

          </div>
        </div>

      </div>
    </>
  );


}
