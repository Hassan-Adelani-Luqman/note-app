import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import RateLimit from "../components/RateLimit";
import NoNotes from "../components/NoNotes";
import toast from "react-hot-toast"
import api from "../lib/axios";

export default function HomePage() {
  const [israteLimited, setisRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        console.log(res.data)
        setisRateLimited(false)
      } catch (error) {
        console.error(error);
        if(error.response.status === 429){
          setisRateLimited(true)
        }else{
          toast.error("failed to load note")
        }
      }finally{
        setLoading(false)
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      {israteLimited && <RateLimit />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading && <h1 className="text-center py-10 text-green-400">Loading...</h1>}

      {notes.length === 0 && !israteLimited && !loading && <NoNotes />}

      {notes.length > 0 && !israteLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note=> <NoteCard key={note._id} note={note} setNotes={setNotes} />)}
        </div>
      )}
      </div>
    </div>
  );
}
