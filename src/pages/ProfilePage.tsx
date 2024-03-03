import React from "react";
import autumnwoman from '../assets/autumnwoman.jpg';

const ProfilePage = () => {

    return (
        <div className='relative w-full h-screen flex items-start'>
            <img src={autumnwoman} className='absolute inset-0 w-full h-full object-cover opacity-70' alt="background" />

            
            {/* Content */}
            <div className='relative z-10 flex flex-col w-[75vw] h-full p-8 text-tertiary justify-start'>
                {/* Title */}
                

                <div className="w-1/2 flex flex-col">
                <h1 className='text-4xl font-bold mb-10'>ClanCollApp</h1>
                <div className="w-1/2 flex flex-row justify-between">
                    <h1 className='text-3xl font-semibold mt-5 mb-10'>Profile</h1>
                    <div className="text-3xl font-semibold mb-20">Switch</div>
                </div>
                </div>
               
                <form className='w-1/2 flex flex-col mb-4'>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='Name' className='text-lg mb-1'>Name</label>
                        <input type='text' id='Name' className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='Name' className='text-lg mb-1'>Last Name</label>
                        <input type='text' id='LastName' className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='phone' className='text-lg mb-1'>Phone</label>
                        <input type='phone' id='Phone' className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='email' className='text-lg mb-1'>Email</label>
                        <input type='email' id='email' className='px-2 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <div className='flex flex-col mb-8'>
                        <label htmlFor='password' className='text-lg mb-1'>Password</label>
                        <input type='password' id='password' className='px-4 py-1 bg-transparent border-b border-tertiary outline-none focus:outline-none' />
                    </div>
                    <button type='submit' className='text-lg font-semibold border-2 border-tertiary bg-primary rounded-md py-1 text-center cursor-pointer'>Save changes</button>
                </form>

                {/* Groups */}
             //Todo build a table here with shadcnui 
             //todo define data of a group to be shown
             //todo build firebase database 
             //todo create a group with test members.
            </div>
        </div>
    );
}

export default ProfilePage;