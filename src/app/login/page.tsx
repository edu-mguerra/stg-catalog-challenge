"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supaBase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePressR = () => {
    router.push("/registration");
  };

  const handleLogin = async () => {
    console.log("[Login] Tentando logar com:", email);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        alert("Email não encontrado ou senha incorreta. Crie uma conta.");
      } else if (error.message === "Email not confirmed") {
        alert(
          "⚠️ Você ainda não confirmou seu e-mail.\n\nVerifique sua caixa de entrada (ou spam) e clique no link de confirmação para ativar sua conta."
        );
      } else {
        alert("Erro ao fazer login: " + error.message);
      }
      return;
    }

    router.push("/catalog");
  };

  return (
    <div className="bg-sky-700 flex justify-center items-center min-h-screen w-full px-4">
      <div className="bg-gray-900 bg-opacity-80 w-full max-w-md p-8 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Entrar no Catálogo STG
        </h2>

        <form
          className="flex flex-col gap-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleLogin();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-white font-semibold mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md py-2 transition"
          >
            Entrar
          </button>
        </form>

        <button
          type="button"
          onClick={handlePressR}
          className="mt-6 text-center text-white underline hover:text-sky-300 transition"
        >
          Criar uma conta
        </button>
      </div>
    </div>
  );
}
