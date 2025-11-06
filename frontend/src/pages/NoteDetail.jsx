import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, ArrowLeftIcon, Trash } from "lucide-react";

export default function NoteDetail() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to get note");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setNote({...note, [name]: value})
  }

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete the note?")) return 
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }
  const saveChanges = async (e) => {
    e.preventDefault()
    if(!note) return
    setSaving(true)
    try{
      await api.put(`/notes/${id}`, note)
      toast.success("notes updated successfully")
      navigate("/")
    }catch(error){
      toast.error(error.message)
      console.error(error)
    }finally{
      setSaving(false)
    }
  }
 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-2xl mx-auto my-10 ">
        <div className="flex justify-between">
          <Link
            to={"/"}
            className="rounded-full p-2 border w-34 hover:bg-gray-700 flex items-center justify-center gap-1"
          >
            <ArrowLeftIcon className="size-5" />
            <p className="text-sm">Back to notes</p>
          </Link>

          <button onClick={handleDelete} className="rounded-full p-2 border cursor-pointer border-red-600 w-34 flex items-center justify-center gap-1">
          <Trash className="text-red-600 size-5"/>
          <span className="text-red-600">Delete note</span>
          </button>
        </div>

        <div className="card bg-base-300 transition-all hover:shadow-lg duration-200 p-4 mt-5">
          <h2 className="card-title text-2xl mb-4">Create new note</h2>
          <form  onSubmit={saveChanges} className="flex flex-col gap-2.5">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={note.title}
              className="border rounded-lg p-2"
              />
              
              <label htmlFor="content">Content</label>
              <textarea
              name="content"
              id="content"
              value={note.content}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />

            <button
              className="bg-green-400 text-black w-34 rounded-full p-2 self-end cursor-pointer hover:bg-green-700 hover:text-white"
              type="submit"
              disabled={saving}
            >
            {saving ? "Saving changes..." : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
