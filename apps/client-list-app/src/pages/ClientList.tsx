// src/pages/ClientList.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { type Client, type ClientsApiResponse } from "../types";
import "./ClientList.css";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { GoPencil, GoTrash } from "react-icons/go";

interface Props {
  userName: string;
}

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const ClientList: React.FC<Props> = ({ userName }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get<ClientsApiResponse>("/users", {
          params: {
            page: 1,
            limit: 16,
          },
        });

        setClients(response.data.clients);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="client-list-container">
      <header className="main-header">
        <div className="header-left">{/* Logo e navegação */}</div>
        <div className="header-right">
          <span>Olá, {userName}!</span>
        </div>
      </header>
      <div className="main-content">
        <div className="clients-grid">
          <h2 className="title">{clients.length} clientes encontrados:</h2>
        </div>
        <div className="clients-grid">
          {clients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="card-header">
                <p>{client.name}</p>
              </div>
              <div className="card-body">
                <p>
                  Salário:{" "}
                  {client.salary ? formatador.format(client.salary) : "N/A"}
                </p>
                <p>
                  Empresa:{" "}
                  {client.companyValuation
                    ? formatador.format(client.companyValuation)
                    : "N/A"}
                </p>
              </div>
              <div className="card-actions">
                <button className="icon-button add-button">
                  <FaPlus />
                </button>
                <button className="icon-button edit-button">
                  <GoPencil />
                </button>
                <button className="icon-button delete-button">
                  <GoTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="create-button-container">
          <button className="create-client-button">Criar cliente</button>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
