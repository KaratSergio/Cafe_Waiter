import { InMemoryOrderRepository } from "../../src/repositories/inMemory/InMemoryOrderRepository";
import { MenuItem } from './../../src/models/MenuItem';
import { Order } from "../../src/models/Orders";

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
        const items: MenuItem[] = [
            { id: "1", name: "Pizza", price: 10 },
            { id: "2", name: "Cola", price: 2 }
        ];
        const order: Order = { id: '1', items, totalPrice: 12, status: "pending" };

        await repository.create(order);

        const orders = await repository.getAll();
        expect(orders).toHaveLength(1);
        expect(orders[0]).toEqual(order);
    });
    
    it("should find the order by id", async () => { 
        const order: Order = { id: "1", items: [], totalPrice: 0, status: "pending" }
        await repository.create(order);
        
        const foundOrder = await repository.getById("1");
        expect(foundOrder).toEqual(order);
     })
    
    it("should return null if the order is not found", async () => {
        const foundOrder = await repository.getById("984");
        expect(foundOrder).toBeNull();
    })
})