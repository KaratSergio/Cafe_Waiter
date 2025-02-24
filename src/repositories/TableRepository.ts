export interface TableRepository {
  updateTableStatus(tableId: number, totalPrice: number): Promise<void>;
}
