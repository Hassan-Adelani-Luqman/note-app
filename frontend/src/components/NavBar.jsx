import { Plus } from "lucide-react"
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="bg-base-300 border-b border-base-content/10 text-green-400 flex justify-between p-10">
      <nav className="text-4xl font-mono tracking-tighter">ThinkBoard</nav>
      <NavLink to={"/create"} className="bg-green-400 text-black p-2 rounded-full flex justify-center items-center gap-0.5"><Plus className="size-5"/> New Note</NavLink>
    </header>
  );
}
