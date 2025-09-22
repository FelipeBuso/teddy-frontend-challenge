// apps/client-list-app/src/pages/ClientList.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { type Client, type ClientsApiResponse } from "../types";
import "./ClientList.css";
import axios from "axios";
import { ClientCard } from "../components/ClientCard";
import { Pagination, Button, CircularProgress } from "@mui/material";
import CreateClientModal from "../components/CreateClientModal";
import EditClientModal from "../components/EditClientModal";
import DeleteClientModal from "../components/DeleteClientModal";
import { type IFormInput } from "../components/EditClientModal";
import Logo from "../assets/logo.svg";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
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
    const newClientList = selectedClients.filter((c) => c.id !== clientId);
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

  const handlePageChange = (ev: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleOpenEditModal = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClient(null);
  };

  const handleOpenDeleteModal = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedClient(null);
  };

  const handleEditClient = async (clientData: IFormInput) => {
    if (!selectedClient) return;

    setLoadingModal(true);
    try {
      await api.patch("/users/" + selectedClient.id, clientData);
      setIsEditModalOpen(false);
      getClients();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingModal(false);
      setSelectedClient(null);
    }
  };

  const handleDeleteClient = async () => {
    if (!selectedClient) return;

    setLoadingModal(true);
    try {
      await api.delete("/users/" + selectedClient.id);
      setIsDeleteModalOpen(false);
      getClients();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingModal(false);
      setSelectedClient(null);
    }
  };

  const handleShowAllClients = () => {
    setShowSelectedOnly(false);
  };

  const handleShowSelectedClients = () => {
    setShowSelectedOnly(true);
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="client-list-container">
      <header className="main-header">
        <div className="header-left">
          <img src={Logo} alt="Logo" width={100} height={50} />
        </div>
        <div className="header-center">
          <button
            className={
              showSelectedOnly
                ? "main-header-button"
                : "main-header-button-selected"
            }
            disabled={!showSelectedOnly}
            onClick={handleShowAllClients}
          >
            Clientes
          </button>
          <button
            className={
              showSelectedOnly
                ? "main-header-button-selected"
                : "main-header-button"
            }
            disabled={showSelectedOnly}
            onClick={handleShowSelectedClients}
          >
            Clientes selecionados
          </button>
        </div>
        <div className="header-right">
          <span>Olá, {userName}!</span>
        </div>
      </header>
      <div className="main-content">
        <div className="clients-grid">
          <h2 className="title">
            {showSelectedOnly
              ? `${selectedClients.length} clientes selecionados:`
              : `${clients.length} clientes encontrados:`}
          </h2>
        </div>
        <div className="clients-grid">
          {(showSelectedOnly ? selectedClients : clients).map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              isSelected={selectedClients.some((c) => c.id === client.id)}
              selectClient={selectClient}
              removeClient={removeSelectedClient}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          ))}
          <CreateClientModal refresh={getClients} />
        </div>
        {!showSelectedOnly && (
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
        )}
      </div>

      {selectedClient && (
        <EditClientModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          loading={loadingModal}
          client={selectedClient}
          onEditClient={handleEditClient}
        />
      )}
      {selectedClient && (
        <DeleteClientModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          loading={loadingModal}
          clientName={selectedClient.name}
          onDeleteConfirm={handleDeleteClient}
        />
      )}
    </div>
  );
};

export default ClientList;
