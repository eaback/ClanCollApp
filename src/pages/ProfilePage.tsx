import React from "react";
import autumnwoman from '../assets/autumnwoman.jpg';

const ProfilePage = () => {

    return (
        <div className='relative w-full h-screen flex items-start'>
            <img src={autumnwoman} className='absolute inset-0 w-full h-full object-cover opacity-70' alt="background" />

            <h1 className='text-4xl font-bold mb-20'>ClanCollApp</h1>
            {/* Content */}
            <div className='relative z-10 flex flex-col w-[75vw] h-full p-8 text-tertiary justify-start'>
                {/* Title */}
                

                
                <div className="w-1/2 flex flex-row justify-between">
                    <h1 className='text-3xl font-semibold mt-20 mb-10'>Profile</h1>
                    <switch className="text-3xl font-semibold mb-20"/>
                </div>

               
                <form className='w-1/2 flex flex-col mb-8'>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='Name' className='text-lg mb-2'>Name</label>
                        <input type='text' id='Name' className='px-4 py-2 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='Name' className='text-lg mb-2'>Last Name</label>
                        <input type='text' id='LastName' className='px-4 py-2 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='phone' className='text-lg mb-2'>Phone</label>
                        <input type='phone' id='Phone' className='px-4 py-2 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='email' className='text-lg mb-2'>Email</label>
                        <input type='email' id='email' className='px-4 py-2 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='password' className='text-lg mb-2'>Password</label>
                        <input type='password' id='password' className='px-4 py-2 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <button type='submit' className='text-lg font-semibold border-2 border-tertiary bg-primary rounded-md py-2 text-center cursor-pointer'>Save changes</button>
                </form>

                {/* Other options */}
                {/* <div className='flex flex-row items-center'>
                    <button className='text-lg font-semibold bg-primary border-2 border-tertiary rounded-md py-2 px-4 cursor-pointer'>Save Changes</button>
                </div> */}
            </div>
        </div>
    );
}

export default ProfilePage;