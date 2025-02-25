export interface TableRepository {
  updateTableStatus(tableId: number, totalPrice: number): Promise<void>;
  archiveTableOrders(tableId: number): Promise<void>;
}
