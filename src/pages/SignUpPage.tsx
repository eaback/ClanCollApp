import React from "react";
import organised from '../assets/organised.jpg';
import Google from '../assets/Google-icon.svg.png';

const SignUpPage = () => {

    return (
        <div className='w-full h-screen flex items-start'>
            
        
            <div className='w-full md:w-1/2 h-full bg-primary flex flex-col p-20 justify-between items-center'>
                <h1 className=' w-full max-w-[500px] mx-auto text-xl text-tertiary font-semibold'>
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
                            type='email'
                            placeholder='Email'

                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'
                            />    
                        <input 
                            type='password'
                            placeholder='Password'
                            
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'/>
                       <input 
                            type='password'
                            placeholder='Confirm password'
                            
                            className='w-full text-tertiary py-2 my-1 bg-transparent border-b border-tertiary outline-none focus:outline-none'/>
                    </div>

                    <div className='w-full flex flex-col my-4'>
                        <button  
                        
                        className='w-full text-primary my-1 font-semibold bg-secondary rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                        >
                            Sign Up
                        </button>
                        <button  
                        
                        className='w-full text-secondary my-1 font-semibold bg-primary border-[2px] border-secondary rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                        >
                            Or Log in here
                        </button>
                    </div>

                    <div className='w-full flex items-center justify-center relative py-2'>
                        
                    </div>

                </div>

                <div className='w-full flex items-center justify-center'>
                    <p className='text-sm font-normal text-tertiary'>
                        Already have an account? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Log in here</span>
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
