import { MenuItem } from "../../src/models/MenuItem";
import { Order } from "../../src/models/Orders";
import { OrderService } from "../../src/services/OrderService";
import { InMemoryOrderRepository } from "../../src/repositories/inMemory/InMemoryOrderRepository";

describe('OrderService', () => {
    let service: OrderService;
    let repository: InMemoryOrderRepository;

    beforeEach(() => {
    repository = new InMemoryOrderRepository();
    service = new OrderService(repository);
    })

    test("", async () => { 
        const orders = await service.getOrders();
        expect(orders).toEqual([])
    })
    
    test("", async () => {
        const items: MenuItem[] = [
            { id: '1', name: 'Donor kebab', price: 6 },
            { id: '2', name: 'Pepsi', price: 3 }
        ]

        const order: Order = await service.createOrder(items)

        expect(order.items).toEqual(items)
        expect(order.totalPrice).toBe(9)
        expect(order.status).toBe('pending')

        const orders = await service.getOrders()
        expect(orders).toHaveLength(1)
        expect(orders[0]).toEqual(order)
     })
})