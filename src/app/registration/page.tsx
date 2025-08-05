"use client"


import { useState } from "react";
import { supabase } from "../../../lib/supaBase";
import { useRouter } from 'next/navigation';

export default function Registration() {
  const router = useRouter()



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handlePressLogin = () => {
    router.push('/login')
  }


  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      console.log('Erro ao registrar:', error.message);
      alert('Erro ao registrar: ' + error.message);
      return;
    }

   alert('Conta criada! Entre no seu Gmail e procure o e-mail de confirmação para ativar sua conta.');
   
  }


  return (
    <div className="bg-sky-700 flex justify-center items-center min-h-screen w-full px-4">
      <div className="bg-gray-900 bg-opacity-80 w-full max-w-md p-8 rounded-lg shadow-lg flex flex-col">
        <h1 className="text-white text-3xl mb-8 text-center font-bold">
          Criar Usuário
        </h1>

        <form
          className="flex flex-col gap-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleRegister();
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
            <label
              htmlFor="password"
              className="text-white font-semibold mb-2"
            >
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
            Criar Conta
          </button>
        </form>

        <button
          type="button"
          onClick={handlePressLogin}
          className="mt-6 text-center text-white underline hover:text-sky-300 transition"
        >
          Voltar para a tela de login
        </button>
      </div>
    </div>
  );
}