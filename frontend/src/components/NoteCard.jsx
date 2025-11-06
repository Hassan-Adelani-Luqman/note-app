import { Link, useNavigate } from "react-router-dom";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils"
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function NoteCard({ note, setNotes }) {
  const navigate = useNavigate()
  const editNote = (e) => {
    e.preventDefault()
    navigate(`/note/${note._id}`)
  }
  async function handleDelete(e, id){
    e.preventDefault()

    if(!window.confirm("Are you sure you wan to delete this note")) return 

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prevNotes)=> prevNotes.filter(note=> note._id !== id))
      toast.success("Note deleted successfully")
    } catch (error) {
      toast.error("Note not deleted")
      console.error(error.response.message)
    }

  }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-300 transition-all hover:shadow-lg duration-200 border-t-4 border-green-400"
    >
      <div className="p-4">
        <h2 className="text-2xl font-mono tracking-tighter">{note.title}</h2>
        <p className="tracking-tighter">{note.content}</p>

        <div className="flex justify-between items-center mt-7">
          <p className="text-sm">{formatDate(new Date(note.createdAt))}</p>
          <div className="flex items-center gap-2">
                <PenSquareIcon onClick={editNote} size={16}/>
                <Trash2Icon onClick={(e)=> handleDelete(e, note._id)} className="text-red-500" size={16}/>
          </div>
        </div>
      </div>
    </Link>
  );
}
