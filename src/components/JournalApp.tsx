// JournalApp.tsx
import React, { useEffect, useState } from 'react';
import { addDoc, collection, DocumentData, getDocs, QueryDocumentSnapshot, Timestamp, query, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebase';
import { useParams } from 'react-router-dom';
import { useClanContext } from './Context/ClanContext';
import { JournalEntry } from './types';

const JournalApp: React.FC = () => {
    const {clanId} = useParams<{clanId: string}> ();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const {user } = useClanContext();
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            if (clanId) {
                try {
                    const journalQuery = query(collection(db, `Clans/${clanId}/JournalEntries`));
                    const querySnapshot = await getDocs(journalQuery);
                    const journalData = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as JournalEntry[];
                    setJournalEntries(journalData);
                } catch(error) {
                    console.error('Error fetching journal entries');
                }
            }
        };
        fetchData();
    }, [clanId]);

    const handleSaveEntry = async () => {
        // if (!clanId || !user) return;

        const user = auth.currentUser;
            if (!user) {
            console.error('User not logged in.');
            return;
            }
        
            try {
            const journalEntriesRef = collection(db, `Clans/${clanId}/JournalEntries`);
            const newEntry: Omit<JournalEntry, 'id' | 'createdAt'> = {
                text,
                createdBy: user ? user.uid : '',
                image: typeof image === 'string' ? image : null,
                title,
            };
        
            // Add the document and retrieve the auto-generated ID
            const docRef = await addDoc(journalEntriesRef, {
                ...newEntry,
                createdAt: Timestamp.now(),
            });
        
            console.log('Journal entry added with ID: ', docRef.id);
            
            const addedEntry: JournalEntry = {
                id: docRef.id,
                title,
                text,
                createdBy: newEntry.createdBy,
                image: newEntry.image,
                createdAt: new Date(),
            };
            setJournalEntries(prevEntries => [addedEntry, ...prevEntries]);

            // Clear input fields after saving
            setTitle('');
            setText('');
            setImage(null);
            } catch (error) {
            console.error('Error adding journal entry:', error);
            }
        };

    const handleDeleteEntry = async (id: string) => {
        try {
            await deleteDoc(doc(db, `Clans/${clanId}/JournalEntries`, id));
            setJournalEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
            console.log('Journal entry deleted successfully');
        } catch (error) {
            console.error('Error deleting journal entry:', error);
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
        setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
    };

    const handleEntryClick = (entryId: string) => {
        setSelectedEntryId(prevId => (prevId === entryId ? null : entryId));
    
    };

    const getSelectedEntry = (): JournalEntry | undefined => {
        return journalEntries.find(entry => entry.id === selectedEntryId);
    };

    const selectedEntry = getSelectedEntry();

    return(

    <div className="flex flex-col h-full">
            <header className="bg-primary text-tertiary py-4 px-6">
                <h1 className="text-4xl font-bold">My Journal</h1>
                <p className="text-lg">Capture your thoughts, memories, and moments</p>
            </header>
            <main className="flex-1 overflow-y-auto px-6 py-4 bg-secondary">
            <input
                    type="text"
                    className="w-full border border-tertiary text-tertiary bg-primary rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full h-60 border border-tertiary text-tertiary bg-primary rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Write your journal entry here..."
                    value={text}
                    onChange={handleTextChange}
                />
                <label className="block mb-4">
                    <span className="text-xl font-semibold text-primary">Upload Image</span>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="mt-2 block w-full border border-tertiary text-tertiary bg-primary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        onChange={handleImageChange}
                    />
                </label>
                {image && (
                    <div className="mb-6">
                        <img src={typeof image === 'string' ? image : ''} alt="Uploaded" className="w-full rounded-md shadow-lg" />
                    </div>
                )}
                <button 
                    className="bg-primary text-tertiary py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    onClick={handleSaveEntry}>
                    Save Entry
                </button>
                <ul className="divide-y divide-tertiary">
                    {journalEntries.map(entry => (
                        <li key={entry.id} className="py-2 flex justify-between items-center text-tertiary bg-primary rounded-lg m-2 p-3" onClick={() => handleEntryClick(entry.id)}>
                            <div>
                                <span>{entry.title}</span>
                                <span className="text-sm text-gray-500">{entry.createdAt instanceof Timestamp ? entry.createdAt.toDate().toLocaleString() : ''}</span>
                            </div>
                            <button className="text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => handleDeleteEntry(entry.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                {selectedEntry && (
                    <div className="p-4 border border-tertiary bg-primary rounded-lg mt-4">
                        <h2 className="text-xl font-bold mb-2">Selected Entry</h2>
                        <p>Title: {selectedEntry.title}</p>
                        <p>Text: {selectedEntry.text}</p>
                        {selectedEntry.image && (
                            <div className="mt-2">
                                <img src={selectedEntry.image} alt="Entry Image" className="w-full rounded-md shadow-lg" />
                            </div>
                        )}
                    </div>
                )}
                {/* Display message if no entry is selected */}
                {!selectedEntry && (
                    <div className="text-center text-gray-500 mt-4">Select an entry to view details</div>
                )}
            </main>
            <footer className="bg-primary text-tertiary py-4 px-6 text-center">
                <p className="text-sm">&copy; 2024 My Journal. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default JournalApp;