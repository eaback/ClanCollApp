import React from 'react';
import { ImagesSliderDemo } from '../components/ImagesSliderDemo';
import { getAuth, signOut } from 'firebase/auth';

const Home = () => {
    const auth = getAuth();

    return (
        <>
            <ImagesSliderDemo/>
            <button 
            className='absolute top-5 right-10 ml-auto text-primary bg-secondary bg-opacity-20 border-secondary p-1  rounded-lg'
            onClick={() => signOut(auth)}>Sign Out</button>
        </>
    )
}

export default Home;