import { InMemoryMenuRepository } from "../../src/repositories/inMemory/InMemoryMenuRepository";
import { MenuItem } from "../../src/models/MenuItem";

describe('InMemoryMenuRepository', () => {
    let repository: InMemoryMenuRepository;

    beforeEach(() => {
        repository = new InMemoryMenuRepository();
    })

    it("should return an empty list initially", async () => {
        const menu = await repository.getAll();
        expect(menu).toEqual([]);
    })

    it("should add a new item to the menu", async () => {
        const item: MenuItem = { id: "1", name: "Gazpacho", price: 14 }
        await repository.create(item)

        const menu = await repository.getAll();
        expect(menu).toHaveLength(1);
        expect(menu[0]).toEqual(item);
    })

    it("must find element by id", async () => {
        const item: MenuItem = { id: "1", name: "Burger", price: 9 }
        await repository.create(item)

        const foundItem = await repository.getById("1");
        expect(foundItem).toEqual(item);
    })

    it("should return null if the element is not found", async () => {
        const foundItem = await repository.getById("938");
        expect(foundItem).toBeNull()
    })
})