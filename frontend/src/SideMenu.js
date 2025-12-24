import {
  Home,
  FileText,
  PlusSquare,
  Star,
  Trash2,
  Settings,
  Folder,
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
    path: "/notes",
  },
  {
    id: "03",
    name: "Create Note",
    icon: PlusSquare,
    path: "/create",
  },
  {
    id: "04",
    name: "Favourites",
    icon: Star,
    path: "/favourites",
  },
  {
    id: "05",
    name: "Trash",
    icon: Trash2,
    path: "/trash",
  },
  {
    id: "06",
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
