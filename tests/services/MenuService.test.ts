import { MenuItem } from "../../src/models/MenuItem";
import { MenuService } from "../../src/services/MenuService";
import { InMemoryMenuRepository } from "../../src/repositories/inMemory/InMemoryMenuRepository";

describe('MenuService', () => {
    let service: MenuService;
    let repository: InMemoryMenuRepository;
    
    beforeEach(() => {
        repository = new InMemoryMenuRepository();
        service = new MenuService(repository);
    })

    test("should return an empty menu initially", async () => { 
        const menu = await service.getMenu();
        expect(menu).toEqual([])
    })
    
    test("should add an item to the menu", async () => {
                const item: MenuItem = { id: "1", name: "Pizza", price: 10 }
        const addedItem = await service.addMenuItem(item);

        expect(addedItem).toEqual(item);
        const menu = await service.getMenu();
        expect(menu).toHaveLength(1);
        expect(menu[0]).toEqual(item);
    })
})