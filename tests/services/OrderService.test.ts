import { MenuItem } from "../../src/models/MenuItem";
import { Order } from "../../src/models/Orders";
import { OrderService } from "../../src/services/OrderService";
import { InMemoryOrderRepository } from "../../src/repositories/inMemory/InMemoryOrderRepository"

describe('OrderService', () => {
    let service: OrderService;
    let repository: InMemoryOrderRepository;

    beforeEach(() => {
    repository = new InMemoryOrderRepository();
    service = new OrderService(repository);
    })

    it("should return an empty orders list initially", async () => { 
        const orders = await service.getOrders();
        expect(orders).toEqual([])
    })
    
    it("should return order", async () => {
        const items: MenuItem[] = [
            { id: '1', name: 'Donor kebab', price: 6 },
            { id: '2', name: 'Pepsi', price: 3 }
        ]

        const order: Order = await service.createOrder(items)

        const expectedItems = items.map(item => ({
            menuItem: { ...item },
            quantity: 1 
        }));

        expect(order.items).toEqual(expectedItems)
        expect(order.totalPrice).toBe(9)
        expect(order.status).toBe('pending')

        const orders = await service.getOrders()
        expect(orders).toHaveLength(1)
        expect(orders[0]).toEqual(order)
    })

    it("should not create an order with an empty items array", async () => {
        const emptyOrder = { items: [] }
        
        try {
            await service.createOrder(emptyOrder.items)
        } catch (error: unknown) {
            const e = error as Error;
            expect(e.message).toBe('Order must contain at least one item')
        }
    })
})