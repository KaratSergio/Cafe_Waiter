import { PostgresOrderRepository } from '../src/repositories/postgreSQL/PostgresOrderRepository';
import { OrderService } from '../src/services/OrderService';
import { logger } from '../src/utils/logger';

// testing the order archiving function
// npx ts-node tests/testArchive.ts

async function testArchiveOrders() {
  const orderRepo = new PostgresOrderRepository();
  const orderService = new OrderService(orderRepo);

  try {
    await orderService.archiveOrders(); 
    logger('Archiving completed');
  } catch (error) {
    logger(`Error while archiving: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
  }
}

testArchiveOrders();