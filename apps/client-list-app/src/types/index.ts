export type Client = {
  id: number;
  name: string;
  email: string;
  salary: number;
  companyValuation: number;
};

export type ClientsApiResponse = {
  clients: Client[];
  totalPages: number;
  currentPage: number;
};
