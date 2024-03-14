import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import organised from '../assets/organised.jpg';
import { collection, doc, setDoc } from 'firebase/firestore';
import {db} from '../Firebase/firebase';


const SignUpPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNr, setPhoneNr] = useState('');
    const [authing, setAuthing] = useState(false);
    const [error, setError] = useState('');

    const signUpWithEmailPassword = async () => {
        setAuthing(true);
        setError('');
    
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setAuthing(false);
            return;
        }
    
        try {
            // Attempt to create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // If user creation succeeds, proceed to create user profile in Firestore
            const user = userCredential.user;
            if (user) {
                const userProfileRef = doc(collection(db, 'Users'), user.uid);
                const userData = {
                    uid: user.uid,
                    email: user.email || '',
                    firstName,
                    lastName, 
                    phone: phoneNr,
                };
                await setDoc(userProfileRef, userData);
            }
    
            // Navigate to the desired location after successful sign-up
            navigate('/git-ClanCollApp/Profil');
        } catch (error) {
            console.log(error);
        } finally {
            setAuthing(false);
        }
    };

    return (
        <div className='w-full h-screen flex items-start'>
            <div className='w-full md:w-1/2 h-full bg-primary flex flex-col p-20 justify-between items-center'>
                <h1 className='w-full max-w-[500px] mx-auto text-xl text-tertiary font-semibold'>
                    ClanCollApp
                </h1>

                <div className='w-full flex flex-col max-w-[500px]'>
                    <div className='w-full flex flex-col mb-1'>
                        <h3 className='text-3xl font-semibold mb-1 text-tertiary'>
                            Sign Up
                        </h3>
                        <p className='text-base mb-2 text-tertiary'>
                            Welcome, please enter your details.
                        </p>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input 
                            type='text'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'
                        />    
                        <input 
                            type='text'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'
                        />    
                        <input 
                            type='text'
                            placeholder='Phone Number'
                            value={phoneNr}
                            onChange={(e) => setPhoneNr(e.target.value)}
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'
                        />    
                        <input 
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'
                        />    
                        <input 
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'
                        />
                        <input 
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'
                        />
                    </div>

                    {error && <p className='text-red-500'>{error}</p>}

                    <button  
                        onClick={signUpWithEmailPassword}
                        className='w-full text-primary my-1 font-semibold bg-secondary rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                        disabled={authing}
                    >
                        {authing ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <button  
                        onClick={() => navigate('/git-ClanCollApp/login')}
                        className='w-full text-secondary my-1 font-semibold bg-primary border-[2px] border-secondary rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                    >
                        Or Log in here
                    </button>
                </div>

                <div className='w-full flex items-center justify-center'>
                    <p className='text-sm font-normal text-tertiary'>
                        Already have an account? <span onClick={() => navigate('/git-ClanCollApp/login')} className='font-semibold underline underline-offset-2 cursor-pointer'>Log in here</span>
                    </p>
                </div>
            </div>

            <div className='hidden md:flex relative w-1/2 h-full flex flex-col'>
                <div className='absolute rounded-lg top-[12%] left-[10%] flex flex-col bg-primary bg-opacity-30'>
                    <h1 className='text-4xl text-tertiary font-bold my-4'>
                        Get your Clan together!
                    </h1>
                    <p className='text-xl text-tertiary font-normal'>
                        Start your Clan today and invite your family or friends to get organised
                    </p>
                </div>
                <img src={organised} className='w-full h-full object-cover'/>
            </div>
        </div>
    )
}

export default SignUpPage;
