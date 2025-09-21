import React from "react";
import { type Client } from "../types";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { GoPencil, GoTrash } from "react-icons/go";

interface ClientCardProps {
  client: Client;
  isSelected: boolean;
  selectClient: (clientId: number) => void;
  removeClient: (clientId: number) => void;
}

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  isSelected,
  selectClient,
  removeClient,
}) => {
  return (
    <div key={client.id} className="client-card">
      <div className="card-header">
        <p>{client.name}</p>
      </div>
      <div className="card-body">
        <p>
          Salário: {client.salary ? formatador.format(client.salary) : "N/A"}
        </p>
        <p>
          Empresa:{" "}
          {client.companyValuation
            ? formatador.format(client.companyValuation)
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
        <button className="icon-button edit-button">
          <GoPencil />
        </button>
        <button className="icon-button delete-button">
          <GoTrash />
        </button>
      </div>
    </div>
  );
};
