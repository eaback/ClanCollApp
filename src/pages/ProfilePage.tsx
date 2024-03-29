import React, { useState, useEffect } from "react";
import Topnavbar from '../components/Navigation/Topnavibar'
import autumnwoman from '../assets/autumnwoman.jpg';
import { doc, getDoc, updateDoc,collection, addDoc, query, where, getDocs, QueryDocumentSnapshot, DocumentData  } from "firebase/firestore";
import { db, auth } from '../Firebase/firebase'
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import projectgroup from "../assets/projectgroup.jpg";
import { useNavigate } from "react-router-dom";
import { useClanContext } from "../components/Context/ClanContext";
import CreateClanPrompt from '../components/ui/Prompt'
import {Clan, User} from '../components/types'




const ProfilePage = () => {
    const [nickName, setNickName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userClans, setUserClans] = useState<Clan[]>([]);
    const [loading, setLoading] = useState(true);
    const [clanName, setClanName] = useState("");
    const navigate = useNavigate();
    const {setSelectedClan } = useClanContext();
    const [showPrompt, setShowPrompt] = useState(false);
    
    // const [clanId, setClanId] = useState<string>("")

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userProfileData = docSnap.data() as User;
                    // console.log("User profile data: " + userProfileData)
                    setNickName(userProfileData.nickName || '');
                    // console.log("Retrieved Nickname:", nickName);
                    setFirstName(userProfileData.firstName || '');
                    setLastName(userProfileData.lastName || '');
                    setPhone(userProfileData.phone || '');
                    setEmail(userProfileData.email || '');
                    // setClanName(userProfileData.clanName || "");
                } else {
                    console.log("User profile data not found!");
                }
            }
        };

        const fetchUserClans = async () => {
            setLoading(true);
            // console.log("Fetching user clans...");
            const user = auth.currentUser;
            if (user) {
                try {
                    const querySnapshot = await getDocs(
                        query(collection(db, "Clans"), where("members", "array-contains", { firstName, lastName, uid: user.uid }))
                    );
                    const clansData: Clan[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => ({
                        clanId: doc.id,
                        clanName: doc.get('clanName'), 
                        admin: doc.get('admin'), 
                        members: doc.get('members') || [], 
                    }));
                    // console.log("Fetched clans data:", clansData);
                    setUserClans(clansData);
                } catch (error) {
                    console.error("Error fetching user clans:", error);
                    setLoading(false);
                }
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchUserProfile();
                fetchUserClans();
            } else {
                // Redirect to login or handle non-authenticated state
                navigate('/git-ClanCollApp/login');
            }
        });

        fetchUserProfile();

        return () => unsubscribe();
    }, [navigate, firstName, lastName]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) {
            console.log("User not logged in. Please log in. ")
            return;
        }

        const docRef = doc(db, "Users", user.uid);
        await updateDoc(docRef, {
            nickName,
            firstName,
            lastName,
            phone,
            email,
        });
    };

    const handleCreateClan = () => {
        setShowPrompt(true);
    };

    const handleViewClan = (clanId: string, clanName: string) => {
        setSelectedClan(clanId, clanName);
        navigate(`/git-ClanCollApp/Dashboard/${clanId}`);
      };

    const handleClosePrompt = () => {
        setShowPrompt(false);
    };

    const handleSignOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigate('/git-ClanCollApp/login');
        }).catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
        });
    };

    return (
        <>
            {/* <Topnavbar /> */}
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
                        className="flex flex-col border-none bg-background  dark:bg-default-100/50 max-w-[610px]"
                        shadow="sm"
                    >
                        <CardBody className=" flex flex-col bg-secondary p-0 rounded-lg">
                        <div className="grid grid-cols-6 md:grid-cols-12 sm:grid-cols-1 gap-6 md:gap-4 items-center justify-center bg-primary rounded-lg m-1 p-2">
                                <div className="relative col-span-6 md:col-span-4 hidden lg:block">
                                    <Image
                                        alt="Album cover"
                                        className="object-cover "
                                        height={200}
                                        shadow="md"
                                        src={projectgroup}
                                        width="100%"
                                    />
                                </div>

                                <div className="flex flex-col col-span-6 md:col-span-8">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-0 border-2 border-tertiary rounded-lg m-2 p-2 ">
                                            <h1 className="text-tertiary font-medium m-2 border-2 p-2 rounded-lg border-tertiary">Your Clans</h1>
                                            <ul className="text-small m-2 p-2">
                                            {userClans.map((clan, index) => {
                                                console.log("Clans:", clan);
                                                return (
                                                    <li key={index}>
                                                        <button onClick={() => handleViewClan(clan.clanId, clan.clanName)} className=" bg-secondary text-primary border-2 border-tertiary rounded-lg hover:underline focus:outline-none m-1 p-1">
                                                            {clan.clanName}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                            </ul>
                                        </div>
                                        <div className="flex flex-col gap-0 border-tertiary border-2 rounded-lg m-2 p-2">
                                            <h1 className="text-tertiary font-medium m-2 border-2 border-tertiary p-2 rounded-lg">
                                                Add New Clan
                                            </h1>
                                            <Button onClick={handleCreateClan} className="text-small m-2 p-2 bg-secondary text-primary">
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
            <div className="absolute top-4 right-4">
                <Button
                    className='ml-2 text-primary font-bold bg-secondary border-tertiary border-[2px] p-1  rounded-lg'
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            </div>
        </>
    );
}

export default ProfilePage;