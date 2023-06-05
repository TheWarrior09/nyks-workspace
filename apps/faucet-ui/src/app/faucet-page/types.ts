export interface DataEntry {
  id: number;
  address: string;
  transactionHash: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface RequestListResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  data: DataEntry[];
}
