import { useState } from 'react';
import organised from '../assets/organised.jpg';
import Google  from '../assets/Google-icon.svg.png'
import '../index.css';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
//configure and include Firebase auth

//login function Google
const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
    .then((response) => {
        console.log(response.user.uid);
        navigate('/git-ClanCollApp/');
    });
};

//signup function email
const signUpWithEmail = async () => {

    // return (

    // )
}

//make sure everything gets validated

//function to change password

// remember user for 30 days

// use different auth providers ( google, email, apple, ...)



    return (//write code to hide the background picture when on mobile devices
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
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'/>

                        <input 
                            type='password'
                            placeholder='Password'
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'/>
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
                        <button className='w-full text-primary my-1 font-semibold bg-secondary rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                            Log in
                        </button>
                        <button className='w-full text-tertiary my-1 font-semibold bg-primary border-[2px] border-tertiary rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                            Register
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
                    onClick={() => signInWithGoogle()} disabled={authing}>
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