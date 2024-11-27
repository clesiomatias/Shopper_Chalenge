/* eslint-disable jsx-a11y/alt-text */
"use client";
import Image from "next/image";
import TravelForm from "@/components/TravelForm";



export default function Home() { 

  return (
    <div className="flex flex-wrap bg-slate-800 items-center justify-center min-h-screen sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full lg:w-4/5 bg-slate-100 flex flex-wrap sm:flex-nowrap rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full sm:w-1/3 p-5 bg-slate-200 flex flex-col justify-center items-center">
          <Image
            src={"/imgs/logo.png"}
            width={150}
            height={150}
            alt="Logo image"
            className= "animate-fadeIn" 
          />
          <div className="flex flex-col gap-4 mt-4 text-center">
            <h1 className="animate-leftSide text-3xl sm:text-4xl lg:text-5xl font-bold text-bright-orange" >
              Vamo Ali!
            </h1>
            <h2 className= "text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 animate-fadeIn">
              Seu transporte, simplificado.
            </h2>
            <h3 className="text-sm invisible sm:visible sm:text-base lg:text-lg font-medium text-gray-600 animate-fadeIn">
              Escolha seu motorista, veja as opções e confirme sua viagem em
              instantes.
            </h3>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-2/3 p-6 bg-slate-300 flex flex-col justify-center items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 text-center mb-4">
            Solicitar Viagem
          </h1>
          <TravelForm />
        </div>
      </div>
    </div>
  );
}
