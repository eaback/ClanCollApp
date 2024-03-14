import React, {useState} from "react";
import { getAuth, signOut } from 'firebase/auth';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth();

  const menuItems = [
    { label: "Home", url: "/git-ClanCollApp" },
    { label: "Profile", url: "/git-ClanCollApp/Profile" },
    { label: "Dashboard", url: "/git-ClanCollApp/Dashboard" },
    { label: "Log Out", url: "/git-ClanCollApp/login" },
  ];

  return (
    <Navbar 
    isBordered 
    isMenuOpen={isMenuOpen} 
    onMenuOpenChange={setIsMenuOpen} 
    className="bg-primary">
    
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
           {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">ClanCollApp</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
           {/* <AcmeLogo /> */}
           <p className="font-bold text-xxl text-inherit text-lg text-tertiary">ClanCollApp</p>
        </NavbarBrand>
        <NavbarItem>
          <Link className="text-tertiary font-bold" href="/git-ClanCollApp">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link className="text-tertiary" href="/git-ClanCollApp/Profile" aria-current="page">
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-tertiary font-bold" href="/git-ClanCollApp/Dashboard">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <Link className="text-tertiary font-bold" href="/git-ClanCollApp/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className="bg-secondary text-primary border-secondary bg-opacity-80" href="/git-ClanCollApp/signup" variant="ghost">
            Sign Up
          </Button>
        </NavbarItem>
        {/* <NavbarItem>
          <Button 
            className='absolute top-5 right-10 ml-auto text-primary bg-secondary bg-opacity-20 border-secondary p-1  rounded-lg'
            onClick={() => signOut(auth)}>Sign Out
          </Button>
        </NavbarItem> */}
      </NavbarContent>
                                              {/* "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined' */}
      <NavbarMenu className="bg-opacity">
      {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full"
              color={index < 3 ? "primary" : "foreground"} // Apply primary color to the first 3 items
              href={item.url} // Use the URL from the menuItems array
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
