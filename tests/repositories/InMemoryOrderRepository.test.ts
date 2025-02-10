import { InMemoryOrderRepository } from "../../src/repositories/inMemory/InMemoryOrderRepository";
import { OrderItem, TestOrder } from "../../src/models/Orders";

describe("InMemoryOrderRepository", () => {
    let repository: InMemoryOrderRepository;

    beforeEach(() => {
        repository = new InMemoryOrderRepository();
    })

    it("should return an empty list of orders initially", async () => { 
        const orders = await repository.getAll();
        expect(orders).toEqual([]);
    })
    
    it("must add a new order", async () => {
        const items: OrderItem[] = [
            { menuItem: {id: "1", name: "Pizza", price: 10}, quantity: 2 },
            { menuItem: {id: "2", name: "Cola", price: 2}, quantity: 1 }
        ];
        const order: TestOrder = {
            id: "1",
            orderNumber: "ORD-001",
            items,
            totalPrice: 22,
            status: "pending",
            isArchived: false,
            createdAt: new Date()
        };

        await repository.create(order);

        const orders = await repository.getAll();
        expect(orders).toHaveLength(1);
        expect(orders[0]).toEqual(order);
    });
    
    it("should find the order by id", async () => { 
        const order: TestOrder = {
            id: "1",
            orderNumber: "ORD-002",
            items: [],
            totalPrice: 0,
            status: "pending",
            isArchived: false,
            createdAt: new Date()
        };
        await repository.create(order);
        
        const foundOrder = await repository.getById("1");
        expect(foundOrder).toEqual(order);
     })
    
    it("should return null if the order is not found", async () => {
        const foundOrder = await repository.getById("984");
        expect(foundOrder).toBeNull();
    })

    it("should archive all orders from yesterday", async () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const activeOrder: TestOrder = { 
        id: "1", orderNumber: "ORD-003", items: [], totalPrice: 10, status: "pending", 
        isArchived: false, createdAt: now 
    };

    const completedOrder: TestOrder = { 
        id: "2", orderNumber: "ORD-004", items: [], totalPrice: 20, status: "ready", 
        isArchived: false, createdAt: yesterday 
    };

    const oldOrder: TestOrder = {
        id: "3", orderNumber: "ORD-005", items: [], totalPrice: 30, status: "pending", 
        isArchived: false, createdAt: yesterday
    };

    await repository.create({ ...activeOrder });
    await repository.create({ ...completedOrder });
    await repository.create({ ...oldOrder });

    const orderCreatedDates = {
        "1": now,
        "2": yesterday,
        "3": yesterday
    };

    await repository.archiveOrders(orderCreatedDates);

    const orders = await repository.getAll();

    expect(orders.find(o => o.id === "2")?.status).toBe("archived");
    expect(orders.find(o => o.id === "3")?.status).toBe("archived");

    expect(orders.find(o => o.id === "1")?.status).toBe("pending");
});

})