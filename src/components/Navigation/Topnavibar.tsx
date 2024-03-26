import React, {useState} from "react";
import { getAuth, signOut } from 'firebase/auth';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useLocation } from "react-router-dom"; 

interface TopnavbarProps {
  clanId?: string;
}

export default function App({ clanId }: TopnavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth();
  const location = useLocation();

  const menuItems = [
    { label: "Home", url: "/git-ClanCollApp" },
    { label: "Profile", url: "/git-ClanCollApp/Profile" },
    { label: "Dashboard", url: `/git-ClanCollApp/Dashboard/${clanId}` },
    // { label: "Log In", url: "/git-ClanCollApp/login" },
    // { label: "Sign Up", url: "/git-ClanCollApp/signup" },
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
           
          <h1 className="text-xxl font-bold text-inherit">ClanCollApp</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
           <p className="font-bold text-xxl text-inherit text-lg text-tertiary">ClanCollApp</p>
        </NavbarBrand>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.label}-${index}`} isActive={location.pathname.startsWith(item.url)}> {/* Highlight active link based on current URL */}
            <Link className="text-tertiary" href={item.url} aria-current={location.pathname.startsWith(item.url) ? "page" : undefined}>
              {item.label}
          </Link>
        </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
     
        <NavbarItem>
          <Button 
            className='ml-2 text-secondary bg-primary bg-opacity-80 border-secondary border-[2px] p-1  rounded-lg'
            onClick={() => signOut(auth)}> Sign Out
          </Button>
        </NavbarItem>
      </NavbarContent>
                                  
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
