import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../Firebase/firebase';
import {Clan} from '../types'
import {User} from '../types'

interface CreateClanProps {
    onClose: () => void;
}

const CreateClanPrompt: React.FC<CreateClanProps> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [members, setMembers] = useState<User[]>([{ uid: '', nickName: '', firstName: '', lastName: '', email: '', phone: '' }]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    

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

    const handleAddMember = async (memberName: string) => {
        // Check if the memberName is in the format "firstName lastName"
        const names = memberName.split(' ');
        let firstName = '';
        let lastName = '';
        if (names.length === 2) {
            firstName = names[0];
            lastName = names[1];
        }
    
        // Check if the member is already added
        const existingMember = members.find(member => member.nickName === memberName || (member.firstName === firstName && member.lastName === lastName));
        if (existingMember) {
            setError('User already added.');
            return;
        }
    
        // Fetch the user based on nickName or firstName+lastName
        let userRef;
        if (firstName && lastName) {
            const usersRef = collection(db, 'Users');
            const usersQuery = query(usersRef, where('firstName', '==', firstName), where('lastName', '==', lastName));
            const snapshot = await getDocs(usersQuery);
            if (!snapshot.empty) {
                userRef = snapshot.docs[0].ref;
            } else {
                setError('User not found.');
                return;
            }
        } else {
            const usersRef = collection(db, 'Users');
            const usersQuery = query(usersRef, where('nickName', '==', memberName));
            const snapshot = await getDocs(usersQuery);
            if (!snapshot.empty) {
                userRef = snapshot.docs[0].ref;
            } else {
                setError('User not found.');
                return;
            }
        }
    
        // Get user data and add to members
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        if(userData) {
        const newUser: User = {
            uid: userDoc.id,
            nickName: userData.nickName || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || ''
        };
        setMembers([...members, newUser]);
        setSelectedNames([...selectedNames, memberName]);
    } else {
        setError("User not found.");
    }
};


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Check if clanName already exists
        const clanRef = collection(db, 'Clans');
        const clanQuery = query(clanRef, where('clanName', '==', name));
        const existingClans = await getDocs(clanQuery);
    
        if (!existingClans.empty) {
            setError('Clan name already exists. Please choose a different name.');
            return;
        }
    
        try {
            // Filter out empty users
            const filteredMembers = members.filter(member => member.firstName !== '' && member.lastName !== '' && member.uid !== '');
    
            // Store data in Firestore and get the generated document ID
            const docRef = await addDoc(clanRef, {
                clanName: name,
                members: filteredMembers.map(member => ({
                    uid: member.uid,
                    firstName: member.firstName,
                    lastName: member.lastName
                })),
                creator: auth.currentUser?.uid,
            });
    
            // Update the clan data to include the clan ID
            const clanId = docRef.id;
            console.log('Document written with ID: ', clanId); // Log the generated document ID
            await updateDoc(docRef, { clanId });
    
            // Close the prompt
            onClose();
        } catch (error) {
            console.error('Error adding document: ', error);
            setError('Failed to create clan. Please try again.');
        }
    };

    const handleNameSelect = (name: string) => {
        if (!selectedNames.includes(name)) {
            setSelectedNames([...selectedNames, name]);
        }
    };

    const handleNameRemove = (name: string) => {
        const updatedSelectedNames = selectedNames.filter(selectedName => selectedName !== name);
        setSelectedNames(updatedSelectedNames);
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                    {selectedNames.length > 0 && (
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Selected Names:</label>
                            <ul>
                                {selectedNames.map((name, index) => (
                                    <li key={index} className="flex items-center mb-1">
                                        <span className="text-sm mr-1">&#8226;</span>
                                        <span>{name
                                        }</span>
                                        <button
                                            type="button"
                                            onClick={() => handleNameRemove(name)}
                                            className="text-sm ml-2 text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
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
};

export default CreateClanPrompt;
