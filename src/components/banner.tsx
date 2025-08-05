"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function Banner() {



    return (
        <>
            {/* Banner */}
            <div className="relative max-w-6xl mx-auto h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                <Image
                    src="/1.jpg"
                    alt="Banner"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg">Bem-vindo ao Catálogo STG</h1>
                    <p className="mt-3 text-lg md:text-xl text-gray-200">Veja os produtos disponíveis e aproveite!</p>
                    <Link
                        href="/login"
                        className="mt-6 bg-white text-sky-700 px-6 py-3 rounded-full font-semibold hover:bg-sky-300 transition"
                    >
                        Entrar
                    </Link>
                </div>
            </div>

        </>

    );
}
