export interface TableRepository {
  // VISITORS repo interface
  updateTableStatus(tableId: number, totalPrice: number): Promise<void>;
  archiveTableOrders(tableId: number): Promise<void>;
}
