import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Search, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="bg-white border-b p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo (using the Wattpad logo) */}
        <div className="flex items-center space-x-2">
          <img
            src="https://www.wattpad.com/wp-web-assets/images/wattpad-logo.svg"
            alt="Wattpad Logo"
            className="h-8"
          />
          <span className="text-xl font-semibold">Wattpad</span>{" "}
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="flex space-x-6 items-center">
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink>
                <span className="text-lg font-medium">Browse</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <span className="text-lg font-medium">Community</span>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Search Box */}
            <NavigationMenuItem>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 w-[300px] pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
            </NavigationMenuItem>

            {/* Write Button */}
            <NavigationMenuItem>
              <NavigationMenuLink>
                <span className="text-lg font-medium">Write</span>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Profile */}
            <NavigationMenuItem>
              <NavigationMenuLink>
                <User className="text-lg" />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
