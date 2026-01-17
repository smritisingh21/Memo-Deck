import {
  Home,
  Star,
  Settings,
  Folder,
  Archive,
  LogOutIcon,
} from "lucide-react";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    name: "Home",
    icon: Home,
    path: "/",
  },
  {
    id: "02",
    name: "All Folders",
    icon: Folder,
    path: "/folders",
  },
  {
    id: "05",
    name: "Favourites",
    icon: Star,
    path: "/favorites",
  },
  {
    id: "06",
    name: "Archives",
    icon: Archive,
    path: "/archives",
  },
  {
    id: "07",
    name: "Logout",
    icon: LogOutIcon,
    path: "/logout",
  },

];
