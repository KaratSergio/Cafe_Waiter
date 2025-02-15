import { InMemoryMenuRepository } from '../../src/repositories/inMemory/InMemoryMenuRepository';
import { MenuItem } from '../../src/models/MenuItem';

describe('InMemoryMenuRepository', () => {
  let repository: InMemoryMenuRepository;

  beforeEach(() => {
    repository = new InMemoryMenuRepository();
  });

  it('should return an empty list initially', async () => {
    const menu = await repository.getAll();
    expect(menu).toEqual([]);
  });

  it('should add a new item to the menu', async () => {
    const item: MenuItem = { id: '1', name: 'Gazpacho', price: 14 };
    await repository.create(item);

    const menu = await repository.getAll();
    expect(menu).toHaveLength(1);
    expect(menu[0]).toEqual(item);
  });

  it('must find element by id', async () => {
    const item: MenuItem = { id: '1', name: 'Burger', price: 9 };
    await repository.create(item);

    const foundItem = await repository.getById('1');
    expect(foundItem).toEqual(item);
  });

  it('should return null if the element is not found', async () => {
    const foundItem = await repository.getById('938');
    expect(foundItem).toBeNull();
  });

  it('should find an element by name', async () => {
    const item: MenuItem = { id: '2', name: 'Sushi', price: 20 };
    await repository.create(item);

    const foundItem = await repository.getByName('Sushi');
    expect(foundItem).toEqual(item);
  });

  it('should throw an error when trying to add a duplicate name', async () => {
    const item: MenuItem = { id: '3', name: 'Steak', price: 30 };
    await repository.create(item);

    await expect(repository.create({ id: '4', name: 'Steak', price: 35 })).rejects.toThrow(
      'An item with this name already exists',
    );
  });

  it('should update an existing menu item', async () => {
    const item: MenuItem = { id: '5', name: 'Pasta', price: 12 };
    await repository.create(item);

    const updatedItem: MenuItem = { id: '5', name: 'Pasta', price: 15 };
    await repository.update(updatedItem);

    const foundItem = await repository.getById('5');
    expect(foundItem).toEqual(updatedItem);
  });

  it('should throw an error when updating a non-existing item', async () => {
    const item: MenuItem = { id: '6', name: 'Soup', price: 8 };
    await expect(repository.update(item)).rejects.toThrow('Menu item not found');
  });

  it('should delete an item by id', async () => {
    const item: MenuItem = { id: '7', name: 'Salad', price: 10 };
    await repository.create(item);

    await repository.delete('7');
    const foundItem = await repository.getById('7');

    expect(foundItem).toBeNull();
  });
});
