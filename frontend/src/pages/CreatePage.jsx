import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from '../lib/axios'

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() !== "" && content.trim() !== "") {
      setIsCreating(true);
      try {
        await api
        .post("/notes", {
          title,
          content,
        })
        toast.success("Note created successfully");
        setIsCreating(false);
        setTitle("");
        setContent("");
        navigate("/");
      } catch (error) {
        toast.error(error.message)
      }
    }else{
        toast.error("All fields required")
    }
}
  return (
    <div className="">
      <div className="max-w-2xl mx-auto my-10 ">
        <Link
          to={"/"}
          className="rounded-full p-2 border w-34 hover:bg-gray-700 flex items-center justify-center gap-1"
        >
          <ArrowLeftIcon className="size-5" />
          <p className="text-sm">Back to notes</p>
        </Link>

        <div className="card bg-base-300 transition-all hover:shadow-lg duration-200 p-4 mt-5">
          <h2 className="card-title text-2xl mb-4">Create new note</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-2"
            />

            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border rounded-lg p-2"
            />

            <button
              className="bg-green-400 text-black w-34 rounded-full p-2 self-end cursor-pointer hover:bg-green-700 hover:text-white"
              type="submit"
              disabled={isCreating ? true : false}
            >
              {isCreating ? "Creating Note..." : "Create Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
