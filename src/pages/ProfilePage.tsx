import React, { useState, useEffect } from "react";
import Topnavbar from '../components/Navigation/Topnavibar'
import autumnwoman from '../assets/autumnwoman.jpg';
import { doc, getDoc, updateDoc,collection, addDoc, query, where, getDocs  } from "firebase/firestore";
import { db, auth } from '../Firebase/firebase'
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import projectgroup from "../assets/projectgroup.jpg";
import { useNavigate } from "react-router-dom";
import CreateClanPrompt from '../components/ui/Prompt'
import {Clan} from '../components/types'

// interface Clan {
    
//     clanName: string;
//     creator: string;
//     members: { type: string; value: string }[];
//     // Add other properties here if needed
// }

const ProfilePage = () => {
    const [nickName, setNickName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userClans, setUserClans] = useState<Clan[]>([]);
    const navigate = useNavigate();
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userProfileData = docSnap.data();
                    console.log("User profile data: " + userProfileData)
                    setNickName(userProfileData.nickName || '');
                    console.log("Retrieved Nickname:", nickName);
                    setFirstName(userProfileData.firstName || '');
                    setLastName(userProfileData.lastName || '');
                    setPhone(userProfileData.phone || '');
                    setEmail(userProfileData.email || '');
                } else {
                    console.log("User profile data not found!");
                }
            }
        };

        const fetchUserClans = async () => {
            const user = auth.currentUser;
            if (user) {
              const querySnapshot = await getDocs(
                query(collection(db, "Clans"), where("members", "array-contains", user.uid)));
              const clansData: Clan[] = querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id,...doc.data() }));
              setUserClans(clansData);
            }
          };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchUserProfile();
                fetchUserClans();
            } else {
                // Redirect to login or handle non-authenticated state
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) {
            console.log("User not logged in. Please log in. ")
            return;
        }

        const docRef = doc(db, "Users", user.uid);
        await updateDoc(docRef, {
            firstName,
            lastName,
            phone,
            email,
        });
    };

    const handleCreateClan = () => {
        setShowPrompt(true);
    };

    const handleViewClan = (clanId: string) => {
        const clan = userClans.find(clan => clan.id === clanId);
    if (clan) {
        navigate(`/clan/${clan.name}`);
    }
      };

    const handleClosePrompt = () => {
        setShowPrompt(false);
    };

    return (
        <>
            <Topnavbar />
            <div className='relative w-full h-screen flex items-start'>
                {showPrompt && <div className="fixed inset-0 bg-gray-900 opacity-50 z-50"></div>}

                <img src={autumnwoman} className='absolute inset-0 w-full h-full object-cover opacity-70' alt="background" />

                <div className='relative z-10 flex flex-col w-[75vw] xs:w-full h-full p-4 text-tertiary justify-around'>
                    <h1 className='text-4xl xs:text-2xl font-bold'>ClanCollApp</h1>
                    <h1 className='text-3xl xs:text-xl font-semibold'>Profile</h1>

                    <form onSubmit={handleSubmit} className='w-1/2 m:w-[75vw] flex flex-col mb-4'>
                    <div className='flex flex-col mb-2'>
                            <label htmlFor='nickName' className='text-lg mb-1'>Nick Name</label>
                            <input type='text' id='nickName' value={nickName} onChange={(e) => setNickName(e.target.value)} className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor='firstName' className='text-lg mb-1'>First Name</label>
                            <input type='text' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor='lastName' className='text-lg mb-1'>Last Name</label>
                            <input type='text' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor='phone' className='text-lg mb-1'>Phone</label>
                            <input type='phone' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor='email' className='text-lg mb-1'>Email</label>
                            <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                        </div>
                        <button type='submit' className='text-lg font-semibold border-2 border-tertiary bg-primary rounded-md py-1 text-center cursor-pointer'>Save changes</button>
                    </form>

                    <Card
                        isBlurred
                        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                        shadow="sm"
                    >
                        <CardBody>
                            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-6 md:col-span-4">
                                    <Image
                                        alt="Album cover"
                                        className="object-cover"
                                        height={200}
                                        shadow="md"
                                        src={projectgroup}
                                        width="100%"
                                    />
                                </div>

                                <div className="flex flex-col col-span-6 md:col-span-8">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-0 border-1 m-2 p-2">
                                            <h1 className="text-medium font-medium m-2 border-2 p-2">Your Clans</h1>
                                            <ul className="text-small m-2 p-2">
                                                {userClans.map((clan, index) => (
                                                    <li key={index}>
                                                        <button onClick={() => handleViewClan(clan.name)} className="text-blue-500 hover:underline focus:outline-none">
                                                            {clan.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex flex-col gap-0 border-tertiary m-2 border-1 p-2">
                                            <h1 className="text-medium font-medium m-2 border-2 p-2">
                                                Add New Clan
                                            </h1>
                                            <Button onClick={handleCreateClan} className="text-small m-2 p-2">
                                                Create Clan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            {showPrompt && <CreateClanPrompt onClose={handleClosePrompt} />}
        </>
    );
}

export default ProfilePage;