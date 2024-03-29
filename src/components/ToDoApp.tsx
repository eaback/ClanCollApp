
import React, { useEffect, useState } from 'react';
import {ToDo } from './types'; 
import {auth, db} from '../Firebase/firebase';
import { doc, getDoc, updateDoc,collection, addDoc, query, where, getDocs, QueryDocumentSnapshot, DocumentData, deleteDoc  } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { useClanContext } from './Context/ClanContext';


const ToDoApp: React.FC = () =>  {
  const {clanId} = useParams<{clanId: string}> ();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [inputText, setInputText] = useState('');
  const { user } = useClanContext();

  useEffect(() => {
    const fetchData = async () => {
      if (clanId) {
        try {
          const todosSnapshot = await getDocs(collection(db, `Clans/${clanId}/ToDos`)); 
          const todosData = todosSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ 
            id: doc.id,
            ...doc.data(),
          })) as ToDo[];
          setTodos(todosData);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      }
    };
    fetchData();
  }, [clanId]);


  const handleAddToDo = async () => {
    if (inputText.trim() === '') return;
  
    const user = auth.currentUser;
    if (!user) {
      console.error('User not logged in.');
      return;
    }
  
    try {
      const todoRef = collection(db, `Clans/${clanId}/ToDos`);
      const newToDo: Omit<ToDo, 'id'> = { 
        text: inputText,
        createdBy: user ? user.uid : '',
      };
  
      // Add the document and retrieve the auto-generated ID
      const docRef = await addDoc(todoRef, newToDo);
      const id = docRef.id;
  
      // Update the todo with the Firestore-generated ID
      const todoWithId: ToDo = {
        id,
        ...newToDo,
      };
  
      setTodos(prevTodos => [...prevTodos, todoWithId]);
      setInputText('');
    } catch (error) {
      console.error('Error adding ToDo:', error);
    }
  };
  
  const handleDeleteToDo = async (id: string) => {
    try {
      const todoDocRef = doc(db, `Clans/${clanId}/ToDos`, id); 

      const todoSnapshot = await getDoc(todoDocRef);
      if (todoSnapshot.exists()) {
      await deleteDoc(todoDocRef); 
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      console.log("Todo deleted successfully", id);
    } else {
      console.log("Document does not exist: ", id);
    }
  } catch (error) {
      console.error('Error deleting ToDo:', error);
    }
  };

  const handleDeleteClick = (id: string) => {
    console.log('Deleting todo with ID:', id);
    console.log('Clan ID: ', clanId);
    handleDeleteToDo(id);
    console.log('Todo deletion requested',id);
  };

  return (
    <div className="flex flex-col h-full bg-secondary">
      <header className="bg-primary text-tertiary py-4 px-6">
        <h1 className="text-2xl font-bold">To-Do List</h1>
      </header>
      <main className="flex-1 overflow-y-auto px-6 py-4 bg-secondary">
        <div className="mb-4">
          <input
            type="text"
            className="w-full border border-tertiary text-tertiary bg-primary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Add new to-do..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
        </div>
        <button
          className="bg-primary text-tertiary px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={handleAddToDo}
        >
          Add
        </button>
        <ul className="divide-y divide-tertiary">
          {todos.map(todo => (
            <li key={todo.id} className="py-2 flex justify-between items-center text-tertiary bg-primary rounded-lg m-2 p-3">
              <span>{todo.text}</span>
              <button
                className="text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() =>
                // {() => handleDeleteToDo(todo.id)}
                handleDeleteClick(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ToDoApp;
