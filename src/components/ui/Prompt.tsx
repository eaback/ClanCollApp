import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from '../../Firebase/firebase';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface CreateClanProps {
    onClose: () => void;
}

interface Member {
    type: string;
    value: string;
}

const CreateClanPrompt: React.FC<CreateClanProps> = ({ onClose }) => {
    const [clanName, setClanName] = useState('');
    const [members, setMembers] = useState<Member[]>([{ type: 'email', value: '' }]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    useEffect(() => {
        // Fetch existing users matching the search query
        const fetchExistingUsers = async () => {
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                return;
            }

            const usersRef = collection(db, 'Users');
            const usersQuery = query(usersRef, where('firstName', '>=', searchQuery), where('firstName', '<=', searchQuery + '\uf8ff'));
            const snapshot = await getDocs(usersQuery);
            const results: string[] = [];
            snapshot.forEach(doc => {
                const user = doc.data();
                results.push(`${user.firstName} ${user.lastName}`);
            });
            setSearchResults(results);
        };

        fetchExistingUsers();
    }, [searchQuery]);

    const handleAddMember = (memberName: string) => {
        const existingMember = members.find(member => member.value === memberName);
        if (existingMember) {
            setError('User already added.');
            return;
        }

        setMembers([...members, { type: 'email', value: memberName }]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Check if clanName already exists
        const clanRef = collection(db, 'Clans');
        const clanQuery = query(clanRef, where('clanName', '==', clanName));
        const existingClans = await getDocs(clanQuery);
    
        if (!existingClans.empty) {
            setError('Clan name already exists. Please choose a different name.');
            return;
        }
    
        try {
            // Store data in Firestore and get the generated document ID
            const docRef = await addDoc(clanRef, {
                clanName,
                members,
                creator: auth.currentUser?.uid,
            });
    
            console.log('Document written with ID: ', docRef.id); // Log the generated document ID
    
            // Close the prompt
            onClose();
        } catch (error) {
            console.error('Error adding document: ', error);
            setError('Failed to create clan. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Create your clan!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="clanName" className="block text-lg font-semibold mb-2">Clan Name:</label>
                        <input
                            type="text"
                            id="clanName"
                            value={clanName}
                            onChange={(e) => setClanName(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="searchQuery" className="block text-lg font-semibold mb-2">Search for Existing Users:</label>
                        <input
                            type="text"
                            id="searchQuery"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                        />
                        <div>
                            {searchResults.map((result, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleAddMember(result)}
                                    className="text-sm text-gray-500 underline mt-2 mr-2"
                                >
                                    {result}
                                </button>
                            ))}
                        </div>
                    </div>
                    {members.map((member, index) => (
                        <div key={index} className="mb-4 flex items-center">
                            <input
                                type="text"
                                value={member.value}
                                readOnly
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary mr-2"
                                required
                            />
                            <button
                        type="button"
                        onClick={() => setMembers([...members, { type: 'email', value: '' }])}
                        className="text-lg font-semibold bg-primary text-white rounded-md px-6 py-2 focus:outline-none hover:bg-primary-dark"
                    >
                        <AddCircleOutlineIcon/>
                    </button>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                            <button
                                type="button"
                                onClick={() => setMembers(members.filter((_, i) => i !== index))}
                                className="mr-2 text-red-500"
                            >
                                <DeleteOutlineIcon fontSize='large'/>
                            </button>
                        </div>
                    ))}
                    {/* <button
                        type="button"
                        onClick={() => setMembers([...members, { type: 'email', value: '' }])}
                        className="text-lg font-semibold bg-primary text-white rounded-md px-6 py-2 focus:outline-none hover:bg-primary-dark"
                    >
                        <AddCircleOutlineIcon/>
                    </button>
                    {error && <p className="text-red-500 mb-4">{error}</p>} */}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-lg font-semibold text-gray-500 mr-4 focus:outline-none hover:text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-lg font-semibold bg-primary text-white rounded-md px-6 py-2 focus:outline-none hover:bg-primary-dark"
                        >
                            Create Clan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateClanPrompt;
