import '../index.css';
import organised from '../assets/organised.jpg';
import Google from '../assets/Google-icon.svg.png'
import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import SignUpPage from './SignUpPage';

export interface ILoginPageProps {}

const Login: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInWithGoogle = async () => {
        setAuthing(true);
        setError('');
        
        try {
            const response = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = response.user;
            
            // Check if the user is new (just signed up)
            if (user && user.metadata.creationTime === user.metadata.lastSignInTime) {
                // Create user profile in Firestore
                const userProfileRef = doc(db, 'Users', user.uid);
                const userData = {
                    uid: user.uid,
                    email: user.email || '',
                    nickName: '',
                    firstName: '', // Add default values or prompt the user to fill them in later
                    lastName: '',
                    phone: '',
                };
                await setDoc(userProfileRef, userData);
            }
    
            navigate('/git-ClanCollApp/Profile');
        } catch (error) {
            console.log(error);
            setError('Failed to sign in with Google.');
            setAuthing(false);
        }

    };

    const signIn = async () => {
        setAuthing(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(auth.currentUser)

            const user = auth.currentUser;
            if (user) {
                const userProfileRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userProfileRef);
                if (docSnap.exists()) {
                    // Populate user profile from Firestore data
                    const userProfileData = docSnap.data();
                    // Set user profile in state or context for use in the application
                }
            }

            navigate('/git-ClanCollApp/Profile');
        } catch (error) {
            console.log(error);
            setError('Failed to sign in. Please check your email and password.');
        } finally {
            setAuthing(false);
        }
    };

    const signUp = () => {
        navigate('/git-ClanCollApp/signup')
    }

    return (
        <div className='w-full h-screen flex items-start'>
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
        
            <div className='w-full md:w-1/2 h-full bg-primary flex flex-col p-20 justify-between items-center'>
                <h1 className=' w-full max-w-[500px] mx-auto text-xl text-tertiary font-semibold'>
                    ClanCollApp
                </h1>

                <div className='w-full flex flex-col max-w-[500px]'>
                    <div className='w-full flex flex-col mb-1'>
                        <h3 className='text-3xl font-semibold mb-1 text-tertiary'>
                            Login
                        </h3>
                        <p className='text-base mb-2 text-tertiary'>
                            Welcome Back! Please enter your details.
                        </p>
                    </div>

                    
                    <div className='w-full flex flex-col'>
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
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'/>
                        {error && <p className='text-red-500'>{error}</p>}
                    </div>

                    <div className='w-full flex items-center justify-between'>
                        <div className='w-full flex items-center'>
                            <input type='checkbox' className='w-4 h-4 mr-2'/>
                            <p className='text-sm text-tertiary'>
                                Remember me
                            </p>
                        </div>

                        <p className='text-sm text-tertiary font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot Password</p>
                    </div>

                    <div className='w-full flex flex-col my-4'>
                        <button  
                        onClick={signIn}
                        disabled={authing}
                        className='w-full text-primary my-1 font-semibold bg-secondary rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                        >
                            Log in
                        </button>
                        <button 
                        className='w-full text-tertiary my-1 font-semibold bg-primary border-[2px] border-tertiary rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                        onClick={signUp}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className='w-full flex items-center justify-center relative py-2'>
                        <div className='w-full h-[1px] bg-black/40'>
                        </div>
                        <p className='text-lg absolute text-tertiary/80 bg-primary'>
                            or
                        </p>
                    </div>
                    <button 
                    className='w-full text-tertiary my-2 font-semibold bg-primary border-[2px] border-tertiary/80 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                    onClick={() => signInWithGoogle()} disabled={authing}
                    >
                        <img src={Google} className='h-3 mr-2' />
                        Sign In With Google
                    </button>

                </div>

                <div className='w-full flex items-center justify-center'>
                    <p className='text-sm font-normal text-tertiary'>
                        Don't have an account yet? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up for free</span>
                    </p>

                </div>
            </div>

        </div>
    )
}

export default Login;