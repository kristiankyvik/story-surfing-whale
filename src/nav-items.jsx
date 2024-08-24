import { Home, PlusCircle } from "lucide-react";
import Index from "./pages/Index.jsx";
import CreateNotePage from "./components/CreateNotePage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Create Note",
    to: "/create-note",
    icon: <PlusCircle className="h-4 w-4" />,
    page: <CreateNotePage />,
  },
];
