import React, { useState, useEffect } from 'react';
import { User } from './types'; // Assuming types.ts is in the same directory
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ShoppingList = ({ user }: { user: User }) => {
    const [items, setItems] = useState<{ id: string; text: string; checked: boolean }[]>([]);
    const [newItem, setNewItem] = useState<string>('');

    useEffect(() => {
    // Simulate fetching items from a database or API
    // Replace this with actual fetch logic in your application
    const fetchItems = async () => {
        try {
        // Example fetch request
        const response = await fetch('/api/items');
        if (response.ok) {
            const data = await response.json();
            setItems(data.items);
        } else {
            throw new Error('Failed to fetch items');
        }
        } catch (error) {
        console.error('Error fetching items:', error);
        }
    };

    fetchItems();
    }, []);

    const addItem = () => {
    if (newItem.trim() !== '') {
        const newItemData = { id: Date.now().toString(), text: newItem, checked: false };
        setItems([...items, newItemData]);
        setNewItem('');
      // Simulate updating database or API with new item
      // Replace this with actual update logic in your application
        fetch('/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: newItemData }),
        });
    }
    };

    const deleteItem = async (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    // Simulate updating database or API by removing item
    // Replace this with actual update logic in your application
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    };

    const toggleCheck = async (id: string) => {
    const updatedItems = items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    // Simulate updating database or API with checked status
    // Replace this with actual update logic in your application
    await fetch(`/api/items/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked: updatedItems.find(item => item.id === id)?.checked }),
    });
    };

    const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
    // Simulate updating database or API with reordered items
    // Replace this with actual update logic in your application
    // Note: Depending on your implementation, you may need to adjust the backend to handle item reordering.
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary">
        <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-bold mb-6 text-primary">Shopping List</h1>
        <div className="flex mb-4">
            <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an item"
            className="flex-grow border-b-2 border-primary outline-none px-2 py-1 rounded-l-md focus:ring-2 focus:ring-primary"
            />
            <button
            onClick={addItem}
            className="ml-4 px-6 py-2 bg-primary text-white font-semibold rounded-r-md shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
            Add
            </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="shopping-list">
            {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                        <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex justify-between items-center mb-2 py-2 px-4 rounded-md ${
                            item.checked
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-white hover:bg-gray-100 text-gray-800'
                        } transition duration-300 ease-in-out`}
                        >
                        <div className="flex items-center">
                            <input
                            type="checkbox"
                            className="form-checkbox h-6 w-6 text-primary focus:ring-2 focus:ring-primary"
                            checked={item.checked}
                            onChange={() => toggleCheck(item.id)}
                            />
                            <span
                            className={`ml-3 text-lg cursor-pointer ${
                                item.checked ? 'line-through' : ''
                            }`}
                            onClick={() => toggleCheck(item.id)}
                            >
                            {item.text}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteItem(item.id)}
                            className="text-sm text-red-600 hover:text-red-700 focus:outline-none"
                        >
                            Delete
                        </button>
                        </li>
                    )}
                    </Draggable>
                ))}
                {provided.placeholder}
                </ul>
            )}
            </Droppable>
        </DragDropContext>
        </div>
    </div>
    );
};

export default ShoppingList;
