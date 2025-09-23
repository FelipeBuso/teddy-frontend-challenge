// src/components/ClientCard.tsx
import React from "react";
import { type Client } from "../types";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { GoPencil, GoTrash } from "react-icons/go";
import { currencyFormater } from "../utils";

interface ClientCardProps {
  client: Client;
  isSelected: boolean;
  selectClient: (clientId: number) => void;
  removeClient: (clientId: number) => void;
  onEdit: (client: Client) => void; // Adiciona a prop para editar
  onDelete: (client: Client) => void; // Adiciona a prop para deletar
}

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  isSelected,
  selectClient,
  removeClient,
  onEdit,
  onDelete,
}) => {
  return (
    <div key={client.id} className="client-card">
      <div className="card-header">
        <p>{client.name}</p>
      </div>
      <div className="card-body">
        <p>
          Salário:{" "}
          {client.salary ? currencyFormater.format(client.salary) : "N/A"}
        </p>
        <p>
          Empresa:{" "}
          {client.companyValuation
            ? currencyFormater.format(client.companyValuation)
            : "N/A"}
        </p>
      </div>
      <div className="card-actions">
        {isSelected && (
          <button
            onClick={() => {
              removeClient(client.id);
            }}
            className="icon-button add-button"
          >
            <FaMinus />
          </button>
        )}
        {!isSelected && (
          <button
            onClick={() => {
              selectClient(client.id);
            }}
            className="icon-button add-button"
          >
            <FaPlus />
          </button>
        )}
        <button
          className="icon-button edit-button"
          onClick={() => onEdit(client)}
        >
          <GoPencil />
        </button>
        <button
          className="icon-button delete-button"
          onClick={() => onDelete(client)}
        >
          <GoTrash />
        </button>
      </div>
    </div>
  );
};
