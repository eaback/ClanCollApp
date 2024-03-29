import { cn } from "../utils/cn";
import React from "react";
import kilimanjaro from '../assets/kilimanjaro.jpg'
import bjork from '../assets/bjork.jpg'
import  DigitalClock from '../components/ui/clock'
import  Calendar from '../components/ui/calender'
import ToDoPage from "../pages/ToDoPage";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import todos from '../assets/todos.jpg'
import journal from '../assets/journal.jpg'
import groceries from '../assets/groceries.jpg'
import ClanMembers from "../pages/ClanMembers";
import { useNavigate } from "react-router-dom";

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

//Todo: check authentication for page

export function DashboardGrid({clanId, clanName }: {clanId: string, clanName: string}) {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    if (clanId) {
      // Replace ":clanId" with the actual clanId value
      navigate(path.replace(':clanId', clanId));
    } else {
      navigate(path);
    }
  }

  return (
    <div className="bg-cover bg-center min-h-screen" style={{backgroundImage: `url(${bjork})`}}>
      <header className="text-4xl text-primary p-1 text-center bg-secondary">{clanName} Clan</header>
    <BentoGrid className="max-w-4xl mx-auto bg-primary">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""} 
          onClick={() => handleClick(item.path)}
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
    header: <img src={todos} alt="To-Do" className="flex flex-1 w-[75] h-full min-h-[6rem] rounded-lg border-primary border-2"/>,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    path: "/git-ClanCollApp/ToDoPage/:clanId"
  },
  {
    title: "Notes",
    description: "Dive into the Clans notes, add, discuss, or change notes. Keep track of your ideas",
    header: <img src={journal} alt="Journal" className="flex flex-1 w-[75] h-full min-h-[6rem] rounded-lg border-primary border-2"/>,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    path: "/git-ClanCollApp/JournalPage/:clanId"
  },
  {
    title: "Groceries",
    description: "Clan's Groceries List, a shared list where every member can manage items",
    header: <img src={groceries} alt="To-Do" className="flex flex-1 w-[75] h-full min-h-[6rem] rounded-lg border-primary border-2"/>,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    path: "/git-ClanCollApp/ShoppinglistPage/:clanId"
  },
  {
    title: "The Clan Planner",
    description:"The Clan planner is displayed here, keep track of everyone's schedule, meetings and appointments.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    path: "/git-ClanCollApp//:clanId"
  },
  {
    title: "Members",
    description: "Manage Clan members here, add, remove or change who is part of your Clan",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    path: "/git-ClanCollApp/ClanMembers/:clanId"
  },
  {
    title: "Calender",
    description: "Yearly Calender",
    header: <Calendar />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    path: "/git-ClanCollApp/ClockPage/:clanId"
  },
  {
    title: "Clan Clock",
    description: "just you clock keeping track of time, so you don't have to :D.",
    header: <DigitalClock />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    path: "/git-ClanCollApp/ClockPage/:clanId"
  },
];


export default DashboardGrid;