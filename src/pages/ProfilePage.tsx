import React, {useState, useEffect}from "react";
import Topnavbar from '../components/Navigation/Topnavibar'
import autumnwoman from '../assets/autumnwoman.jpg';
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import {db, auth} from '../Firebase/firebase'

const ProfilePage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if(user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const userProfileData = docSnap.data();
                setFirstName(userProfileData.firstName || '');
                setLastName(userProfileData.lastName || '');
                setPhone(userProfileData.phone || '');
                setEmail(userProfileData.email || '');
            } else {
                console.log("No such document!");
            }
        }
    };

    fetchUserProfile();
}, []);

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

    return (
        <>
        <Topnavbar/>
        <div className='relative w-full h-screen flex items-start'>
            <img src={autumnwoman} className='absolute inset-0 w-full h-full object-cover opacity-70' alt="background" />

            <div className='relative z-10 flex flex-col w-[75vw] h-full p-8 text-tertiary justify-start'>
                <h1 className='text-4xl font-bold mb-10'>ClanCollApp</h1>
                <h1 className='text-3xl font-semibold mt-5 mb-10'>Profile</h1>

                <form onSubmit={handleSubmit} className='w-1/2 flex flex-col mb-4'>
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

                {/* Groups */}
                //Todo: Build a table here with shadow-ui
                //Todo: Define data of a group to be shown
                //Todo: Create a group with test members
            </div>
        </div>
        </>
    );
}

export default ProfilePage;