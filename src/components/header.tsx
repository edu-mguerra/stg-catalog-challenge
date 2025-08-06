"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supaBase";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const totalQuantity = 0

  const fetchCartItems = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Usuário não autenticado:", userError);
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select("id, quantity, products(*)")
      .eq("user_id", user.id); // 🔥 Filtrando só do usuário atual

    if (error) {
      console.error("Erro ao buscar carrinho:", error);
      return;
    }

    const totalQuantity = data.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    setCartCount(totalQuantity);


  };
  useEffect(() => {

    const intervalId = setInterval(() => {
      fetchCartItems();

    }, 1000);

    return () => clearInterval(intervalId);
  }, []);



  return (
    <header className="h-16 w-full fixed top-0 bg-white/10 backdrop-blur-md shadow z-50 px-4 md:px-10 flex justify-between items-center border-b border-white/10">
      <Link
        href="/catalog"
        className="text-xl font-bold text-sky-400 cursor-pointer drop-shadow"
      >
        STG Catálogo
      </Link>

      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        <div className="flex">
          <FontAwesomeIcon icon={faBars} size="lg" />
          {cartCount > 0 && (
            <span className="text-black font-bold  bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </button>

      <nav
        className={`absolute top-16 left-0 w-full bg-white/10 backdrop-blur-md md:static md:flex md:space-x-6 md:w-auto ${menuOpen ? "block" : "hidden"
          } md:block font-medium text-white px-4 md:px-0 py-4 md:py-0 shadow md:shadow-none border-t border-white/10 md:border-none transition-all`}
      >
        <Link
          href="/catalog"
          className="text-black font-bold  block py-2 md:py-0 hover:text-sky-400 hover:scale-[1.02] transition"
          onClick={() => setMenuOpen(false)}
        >
          Produtos
        </Link>

        <Link
          href="/cart"
          className="text-black font-bold  block py-2 md:py-0 flex items-center gap-2 hover:text-sky-400 hover:scale-[1.02] transition relative"
          onClick={() => setMenuOpen(false)}
        >
          <span>Carrinho</span>
          <FontAwesomeIcon icon={faCartShopping} />

          {cartCount > 0 && (
            <span className="text-black font-bold  absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}

        </Link>

        <Link
          href="/"
          className="block py-2 md:py-0 text-red-400 hover:text-red-500 hover:scale-[1.02] transition"
          onClick={() => setMenuOpen(false)}
        >
          Sair
        </Link>
      </nav>
    </header>
  );
};
