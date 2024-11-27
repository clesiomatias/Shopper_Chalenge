"use client";
import React, { useState } from "react";

interface TravelHistoryData {
  id: string;
  confirmed_at: string;
  driver:{
    id: string;
    name: string;    
  }
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  date:string;
  value: number;
}

const TravelHistory: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [driverFilter, setDriverFilter] = useState("0");
  const [travelHistoryData, setTravelHistoryData] = useState<
    TravelHistoryData[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const normalizeDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year}\n${hours}:${minutes}`;
  };


  const fetchTravelHistory = async () => {
    setError(null);
    if (!userId.trim()) {
      setError("O ID do usuário é obrigatório.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/ride?customer_id=${userId}&driver_id=${driverFilter}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar o histórico de viagens.");
      }

      const data = await response.json();
      console.log(data);
      setTravelHistoryData(data);
    } catch (error) {
      console.error(error);
      setError("Erro ao buscar o histórico de viagens.");
    }
  };

  return (
    <div className="min-flex flex-col sm:flex-row h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Histórico de Viagens
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="ID do Usuário"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <select
            value={driverFilter}
            onChange={(e) => setDriverFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="0">Todos os Motoristas</option>
            <option value="1">Motorista 1</option>
            <option value="2">Motorista 2</option>
            <option value="3">Motorista 3</option>
          </select>

          <button
            onClick={fetchTravelHistory}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Aplicar Filtro
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Lista de Viagens */}
        {travelHistoryData.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Data e Hora</th>
                <th className="border p-2">
                  Motorista <th className="border p-2">id - Nome</th>
                </th>
                <th className="border p-2">Origem</th>
                <th className="border p-2">Destino</th>
                <th className="border p-2">Distância</th>
                <th className="border p-2">Duração</th>
                <th className="border p-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {travelHistoryData.map((travel) => (
                <tr key={travel.id}>
                  <td className="border p-2">
                    {normalizeDate(travel.confirmed_at)}
                  </td>
                  <td className="border p-2">
                    <td className="border p-2">{travel.driver.id}</td>
                    <td className="border p-2">{travel.driver.name}</td>
                  </td>
                  <td className="border p-2">{travel.origin}</td>
                  <td className="border p-2">{travel.destination}</td>
                  <td className="border p-2">
                    {travel.distance.toFixed(2)} km
                  </td>
                  <td className="border p-2">{travel.duration}</td>
                  <td className="border p-2">R$ {travel.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">
            Nenhuma viagem encontrada.
          </p>
        )}
      </div>
    </div>
  );
};

export default TravelHistory;
