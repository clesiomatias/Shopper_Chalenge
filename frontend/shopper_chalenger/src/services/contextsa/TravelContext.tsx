"use client";
import React, { createContext, useContext, useState } from "react";


interface EstimateData {
  customer_id: string;
  origin: string;
  destination: string;  

}
interface ReturnData{
  customer_id:string;
  origin_name:string;
  destination_name:string;
  distance:number;
  duration:string;
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];

}
interface Option {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}
interface EstimateResult {
  success: boolean;
  errorMessage?: string;
 
}

interface TravelContextType {
  estimateData: EstimateData;
  setEstimateData: React.Dispatch<React.SetStateAction<EstimateData>>;
  handleEstimate: () => Promise<EstimateResult> ;
  returnData: ReturnData | undefined
}



const TravelContext = createContext<TravelContextType | undefined>(undefined);


export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [estimateData, setEstimateData] = useState<EstimateData>({
    customer_id: "",
    origin: "",
    destination: "",
    
  });const [returnData, setReturnData] = useState<ReturnData | undefined>(undefined);

  const handleEstimate = async () => {
    const { customer_id, origin, destination } = estimateData;

    if (!customer_id || !origin || !destination) {
      alert("Por favor, preencha todos os campos.");
      return { success: false, errorMessage: "Erro ao estimar a viagem." };
    }

    try {
      const response = await fetch("http://localhost:8080/ride/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id, origin, destination }),
      });
      if (response.status != 200) {
        alert(`Dados Inválidos`);
        return { success: false, errorMessage: "Erro ao estimar a viagem." };
      }
      const data = await response.json();
     
     setReturnData( {
        customer_id: customer_id,
        origin_name: origin,
        destination_name: destination,
        distance: parseFloat(data.distance),
        duration: data.duration,
        origin: {
          latitude: data.origin.latitude,
          longitude: data.origin.longitude,
        },
        destination: {
          latitude: data.destination.latitude,
          longitude: data.destination.longitude,
        },
        options: data.options.map((option: Option) => ({
          id: option.id,
          name: option.name,
          description: option.description,
          vehicle: option.vehicle,
          review: option.review,
          value: Number(option.value),
        })),
      })
      return { success: true };

    } catch (error) {
      console.error("Erro ao estimar o custo da viagem:", error);
      return { success: false, errorMessage: error as string }
    }
  };

  return (
    <TravelContext.Provider
      value={{ estimateData, setEstimateData, handleEstimate , returnData}}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravelContext = (): TravelContextType => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error(
      "useTravelContext deve ser usado dentro de um TravelProvider."
    );
  }
  return context;
};
