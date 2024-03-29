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
        Get your Clan together <br />  simplify you daily life
        </motion.p> 
      </motion.div>
    </ImagesSlider>
  );
}