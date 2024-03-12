import { cn } from "../utils/cn";
import React from "react";
import kilimanjaro from '../assets/kilimanjaro.jpg'
import bjork from '../assets/bjork.jpg'

import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { ImagesSliderDemo } from "./ImagesSliderDemo";
import { Suspense } from "react";


//Todo: create clock in lower right
//Todo: make hover react instead of click
//Todo: when clicked move to app page for example Todo's
//Todo: build Firebase
//Todo: check authentication for page

export function DashboardGrid() {
  return (
    <div className="bg-cover bg-center min-h-screen" style={{backgroundImage: `url(${bjork})`}}>
    <BentoGrid className="max-w-4xl mx-auto bg-primary">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 opacity-100"></div>
);
const items = [
  {
    title: "Clan To-Do's",
    description: 
    "Keep track of your Clans To-Do's, add, change or remove by clicking this screen.",
    header: <ImagesSliderDemo />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Notes",
    description: "Dive into the Clans notes, add, discuss, or change notes. Keep track of your ideas",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Groceries",
    description: "Clan's Groceries List, a shared list where every member can manage items",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Clan Planner",
    description:"The Clan planner is displayed here, keep track of everyone's schedule, meetings and appointments.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Members",
    description: "Manage Clan members here, add, remove or change who is part of your Clan",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Calender",
    description: "Yearly Calender",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Clan Clock",
    description: "just you clock keeping track of time, so you don't have to :D.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];


export default DashboardGrid;