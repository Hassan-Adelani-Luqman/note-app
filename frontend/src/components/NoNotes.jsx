import { Notebook } from "lucide-react";
import { Link } from "react-router-dom"

export default function NoNotes() {
  return (
    <div className="max-w-2xl flex flex-col justify-center items-center">
      <Notebook className="text-green-400 border-2 size-18 p-4 rounded-full bg-gray-900" />
      <h2 className="text-lg font-bold">No notes yet</h2>
      <p className="text-sm">Ready to organize your thoughts? create your first note</p>
      <Link to="/create" className="bg-green-400 rounded-lg p-2 m-2 flex justify-center items-center text-black">
        <button>Create your first note</button>
      </Link>
    </div>
  );
}
