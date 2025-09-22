import React, { useEffect, useState } from "react";
import api from "../services/api";
import { type Client, type ClientsApiResponse } from "../types";
import "./ClientList.css";
import axios from "axios";
import { ClientCard } from "../components/ClientCard";
import { Pagination } from "@mui/material";
import CreateClientModal from "../components/CreateClientModal";

interface Props {
  userName: string;
}

const ClientList: React.FC<Props> = ({ userName }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const selectClient = (clientId: number) => {
    const isAlreadySelected = selectedClients.some((c) => c.id === clientId);

    if (!isAlreadySelected) {
      const client = clients.find((c) => c.id === clientId);
      if (client) {
        const pushedSelectedClient = [...selectedClients, client];
        setSelectedClients(pushedSelectedClient);
      }
    }
  };

  const removeSelectedClient = (clientId: number) => {
    console.log({ clientId });
    console.log({ selectedClients });
    const newClientList = selectedClients.filter((c) => c.id !== clientId);
    console.log({ newClientList });
    setSelectedClients(newClientList);
  };

  const getClients = async () => {
    try {
      const response = await api.get<ClientsApiResponse>("/users", {
        params: {
          page: currentPage,
          limit: 16,
        },
      });

      setClients(response.data.clients);
      setTotalPages(response.data.totalPages);
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

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    getClients();
  }, [currentPage]);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (ev: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

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
            <ClientCard
              client={client}
              isSelected={selectedClients.some((c) => c.id === client.id)}
              selectClient={selectClient}
              removeClient={removeSelectedClient}
            />
          ))}
        </div>
        <div className="clients-grid">
          <CreateClientModal />
        </div>
        <div className="pagination-container">
          <Pagination
            count={totalPages}
            shape="rounded"
            onChange={handlePageChange}
            color="primary"
            hideNextButton
            hidePrevButton
          />
        </div>
      </div>
    </div>
  );
};

export default ClientList;
