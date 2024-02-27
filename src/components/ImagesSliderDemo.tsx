"use client";
import { motion } from "framer-motion";
import { ImagesSlider } from "./ui/images-slider";
import family from  '../assets/family.jpg';
import globe from  '../assets/globe.jpg';
import groupshout from  '../assets/groupshout.jpg';
import hands from  '../assets/hands.jpg';
import projectgroup from  '../assets/projectgroup.jpg';
import 'tailwindcss/tailwind.css';
import { useNavigate } from "react-router-dom";


export function ImagesSliderDemo() {
  const images = [
        family,
        globe,
        groupshout,
        hands,
        projectgroup,
  ];

  const navigate = useNavigate();
  
  return (
    
   
    //todo: adjust font
    //todo: remove button
    //todo: change text for home page

    <ImagesSlider className="h-[100vh]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        {/* Homepage text needs to be adjusted */}
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for 
        </motion.p> 
        <button className="px-4 py-2 backdrop-blur-sm border bg-tertiary bg-opacity-10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4"
                onClick={() => navigate("/git-ClanCollApp/login")}
                >
                  {/* button can be removed when auth is in place */}
          <span>Login →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}