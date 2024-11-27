"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useTravelContext } from "@/services/contextsa/TravelContext";
import { CircularProgress } from "@nextui-org/progress";
import { useRouter } from "next/navigation";

interface DriverOption {
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

interface RideData {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

const TravelOptions: React.FC = () => {
  const { returnData } = useTravelContext();
  const [value, setValue] = useState<number>(0);
  const [mapImageUrl, setMapImageUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (returnData) {
      fetchMapImage(returnData.origin, returnData.destination)
        .then((imgUrl) => {
          
          setMapImageUrl(imgUrl); 
        })
        .catch((error) => {
          console.error("Erro ao buscar imagem:", error);
        });
    }

    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);
    return () => clearInterval(interval);
  }, [returnData]);

  if (!returnData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="warning"
          showValueLabel={true}
        />
      </div>
    );
  }

  const driverOptions: DriverOption[] = returnData.options;

  const handleSelectDriver = async (chosenDriver: DriverOption) => {
    const rideData: RideData = {
      customer_id: returnData.customer_id,
      origin: returnData.origin_name,
      destination: returnData.destination_name,
      distance: Number(returnData.distance),
      duration: returnData.duration,
      driver: {
        id: chosenDriver.id,
        name: chosenDriver.name,
      },
      value: Number(chosenDriver.value),
    };

    try {
      const response = await fetch("http://localhost:8080/ride/confirm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rideData),
      });
      console.log(response);

      if (response.ok) {
        alert("Viagem confirmada com sucesso!");
        router.push("/TravelHistory");
      } else {
        alert("Falha ao confirmar a viagem.");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  const fetchMapImage = async (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number }
  ) => {
    const response = await fetch(
      `http://localhost:8080/map-image?originLat=${origin.latitude}&originLng=${origin.longitude}&destinationLat=${destination.latitude}&destinationLng=${destination.longitude}`
    );
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob); 

    return imageUrl;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-800 mt-6">
        Opções de Viagem
      </h1>

      <div className="w-full max-w-4xl my-6">
        {mapImageUrl && (
          <Image
          isZoomed
            src={mapImageUrl}
            alt="Mapa da rota"
            width={600}
            height={300}
            className="rounded-lg shadow-lg"
          />
        )}
      </div>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Motoristas Disponíveis
        </h2>
        <ul className="space-y-4">
          {driverOptions.map((driver) => (
            <li
              key={driver.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {driver.name}
                </h3>
                <p className="text-gray-600">{driver.description}</p>
                <p className="text-sm text-gray-500">
                  Veículo: {driver.vehicle}
                </p>
                <p className="text-sm text-yellow-500">
                  Avaliação: {driver.review.rating}/5
                </p>
                <p className="text-sm text-gray-500">
                  Comentários: {driver.review.comment}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg text-blue-600">
                  R$ {driver.value}
                </p>
                <Button
                  onClick={() => handleSelectDriver(driver)}
                  color="primary"
                >
                  Escolher
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TravelOptions;
