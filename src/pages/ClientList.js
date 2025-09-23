import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../style/index.css";
import axios from "axios";
import { ClientCard } from "../components/ClientCard";
import { Pagination, CircularProgress } from "@mui/material";
import CreateClientModal from "../components/CreateClientModal";
import EditClientModal from "../components/EditClientModal";
import DeleteClientModal from "../components/DeleteClientModal";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
const ClientList = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showSelectedOnly, setShowSelectedOnly] = useState(false);
    const [recordsLimit, setRecordsLimit] = useState(16);
    const [userName, setUserName] = useState("");
    const selectClient = (clientId) => {
        const isAlreadySelected = selectedClients.some((c) => c.id === clientId);
        if (!isAlreadySelected) {
            const client = clients.find((c) => c.id === clientId);
            if (client) {
                const pushedSelectedClient = [...selectedClients, client];
                setSelectedClients(pushedSelectedClient);
            }
        }
    };
    const removeSelectedClient = (clientId) => {
        const newClientList = selectedClients.filter((c) => c.id !== clientId);
        setSelectedClients(newClientList);
    };
    const getClients = async () => {
        try {
            const response = await api.get("/users", {
                params: {
                    page: currentPage,
                    limit: recordsLimit,
                },
            });
            setClients(response.data.clients);
            setTotalPages(response.data.totalPages);
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                setError(e.message);
            }
            else {
                setError("An unknown error occurred.");
            }
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getClients();
        const storedName = localStorage.getItem("userName");
        setUserName(storedName ?? "");
    }, []);
    useEffect(() => {
        getClients();
    }, [currentPage, recordsLimit]);
    const handlePageChange = (_ev, page) => {
        setCurrentPage(page);
    };
    const handleOpenEditModal = (client) => {
        setSelectedClient(client);
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedClient(null);
    };
    const handleOpenDeleteModal = (client) => {
        setSelectedClient(client);
        setIsDeleteModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedClient(null);
    };
    const handleEditClient = async (clientData) => {
        if (!selectedClient)
            return;
        setLoadingModal(true);
        try {
            await api.patch("/users/" + selectedClient.id, clientData);
            setIsEditModalOpen(false);
            getClients();
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoadingModal(false);
            setSelectedClient(null);
        }
    };
    const handleDeleteClient = async () => {
        if (!selectedClient)
            return;
        setLoadingModal(true);
        try {
            await api.delete("/users/" + selectedClient.id);
            setIsDeleteModalOpen(false);
            getClients();
        }
        catch (e) {
            console.error(e);
        }
        finally {
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
        return _jsx(CircularProgress, {});
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    const exitApp = () => {
        localStorage.removeItem("userName");
        navigate("/");
    };
    return (_jsxs("div", { className: "client-list-container", children: [_jsxs("header", { className: "main-header", children: [_jsx("div", { className: "header-left", children: _jsx("img", { src: Logo, alt: "Logo", width: 100, height: 50 }) }), _jsxs("div", { className: "header-center", children: [_jsx("button", { className: showSelectedOnly
                                    ? "main-header-button"
                                    : "main-header-button-selected", disabled: !showSelectedOnly, onClick: handleShowAllClients, children: "Clientes" }), _jsx("button", { className: showSelectedOnly
                                    ? "main-header-button-selected"
                                    : "main-header-button", disabled: showSelectedOnly, onClick: handleShowSelectedClients, children: "Clientes selecionados" }), _jsx("button", { className: "main-header-button", onClick: exitApp, children: "Sair" })] }), _jsx("div", { className: "header-right", children: _jsxs("span", { children: ["Ol\u00E1, ", userName, "!"] }) })] }), _jsxs("div", { className: "main-content", children: [_jsxs("div", { className: "clients-grid-header", children: [_jsx("h2", { className: "title", children: showSelectedOnly
                                    ? `${selectedClients.length} clientes selecionados:`
                                    : `${clients.length} clientes encontrados:` }), _jsxs("div", { className: "records-limit-control", children: [_jsx("span", { children: "Clientes por p\u00E1gina:" }), _jsxs("select", { className: "records-select", id: "records-limit-select", value: recordsLimit, onChange: (e) => {
                                            setRecordsLimit(Number(e.target.value));
                                            setCurrentPage(1);
                                        }, children: [_jsx("option", { value: 8, children: "8" }), _jsx("option", { value: 16, children: "16" }), _jsx("option", { value: 24, children: "24" }), _jsx("option", { value: 32, children: "32" })] })] })] }), _jsxs("div", { className: "clients-grid", children: [(showSelectedOnly ? selectedClients : clients).map((client) => (_jsx(ClientCard, { client: client, isSelected: selectedClients.some((c) => c.id === client.id), selectClient: selectClient, removeClient: removeSelectedClient, onEdit: handleOpenEditModal, onDelete: handleOpenDeleteModal }, client.id))), _jsx(CreateClientModal, { refresh: getClients })] }), !showSelectedOnly && (_jsx("div", { className: "pagination-container", children: _jsx(Pagination, { count: totalPages, shape: "rounded", onChange: handlePageChange, color: "primary", hideNextButton: true, hidePrevButton: true }) }))] }), selectedClient && (_jsx(EditClientModal, { open: isEditModalOpen, onClose: handleCloseEditModal, loading: loadingModal, client: selectedClient, onEditClient: handleEditClient })), selectedClient && (_jsx(DeleteClientModal, { open: isDeleteModalOpen, onClose: handleCloseDeleteModal, loading: loadingModal, clientName: selectedClient.name, onDeleteConfirm: handleDeleteClient }))] }));
};
export default ClientList;
