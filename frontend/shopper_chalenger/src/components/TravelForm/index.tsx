"use client";

import React ,{useState} from "react";
import { useTravelContext } from "@/services/contextsa/TravelContext";
import { Button } from "@nextui-org/button";
import {useRouter} from "next/navigation";


const TravelForm: React.FC = () => {
  const { estimateData, setEstimateData, handleEstimate } = useTravelContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async(e : React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isEstimateValid = await handleEstimate();
    if (isEstimateValid) {
      console.log("Viagem estimada com sucesso!",estimateData);
      router.push("/TravelOptions");
      setLoading(false);
      
    }
      
    
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Estimar o Custo da Viagem
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID do Usuário
          </label>
          <input
            type="text"
            value={estimateData.customer_id}
            onChange={(e) =>
              setEstimateData((prev) => ({ ...prev, customer_id: e.target.value }))
            }
            placeholder="Digite o ID do usuário"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço de Origem
          </label>
          <input
            type="text"
            value={estimateData.origin}
            onChange={(e) =>
              setEstimateData((prev) => ({ ...prev, origin: e.target.value }))
            }
            placeholder="Digite o endereço de origem"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço de Destino
          </label>
          <input
            type="text"
            value={estimateData.destination}
            onChange={(e) =>
              setEstimateData((prev) => ({
                ...prev,
                destination: e.target.value,
              }))
            }
            placeholder="Digite o endereço de destino"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <Button
          type="submit"
          isLoading={loading}
          color="primary"
        >
          Estimar Custo
        </Button>
      </form>
    </div>
  );
};

export default TravelForm;
