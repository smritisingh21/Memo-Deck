import {
  Home,
  FileText,
  PlusSquare,
  Star,
  Trash2,
  Settings,
  Folder,
  FolderPlus,
  Archive,
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
    id: "03",
    name: "Create Note",
    icon: PlusSquare,
    path: "/create-note",
  },
  {
    id: "04",
    name: "Create Folder",
    icon: FolderPlus,
    path: "/create-folder",
  },
  {
    id: "05",
    name: "Favourites",
    icon: Star,
    path: "/favourites",
  },
  {
    id: "06",
    name: "Archives",
    icon: Archive,
    path: "/trash",
  },
  {
    id: "07",
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
