import { Suspense, useEffect, useState } from "react"
import { Await, Link, Navigate, useLoaderData, useNavigate } from "react-router-dom"
import  deleteNote  from "../utils/delete"

export const loader = async () => {
    const id = localStorage.getItem("noteId")
    const authorId = localStorage.getItem("userId") //для исключения возможности подстановки данных в local storage
    const query = new URLSearchParams({
        id,
        authorId,
    }).toString()
    const notePromise = fetch(`http://localhost:5001/notes?${query}`)
                            .then((r) => r.json())
                            .then((notes) => notes[0])
    return { notePromise }
}

export default function EditNote() {
    const [note, setNote] = useState({
      title: "",
      text: "",
      date: "",
      id: "",
      authorId: ""
    });

    const { notePromise } = useLoaderData()

    const navigate = useNavigate()

    function handleDeleteNote(e) {
        deleteNote(e.target.id)
        navigate('/notes')
    }
  
    function handleSaveNote() {
      fetch(`http://localhost:5001/notes/${note.id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: note.title,
          text: note.text,
          authorId: note.authorId,
          date: note.date
        })
      })
      .then(() => navigate('/notes'))
    }
  
    useEffect(() => {
      notePromise.then((note) => {
        if(note) {
            setNote(note);
        } else {
            navigate('/*')
        }
    });
    }, [notePromise]);
  
    return (
      <>
        <div className="prose flex flex-col gap-4 mt-6 w-screen">
          <div className="flex flex-row justify-between">
            <Link to={`/notes`} className="bg-gray-200 px-1 h-5/6 no-underline">Back</Link>
            <h1 className="m-0">Edit note</h1>
            <button onClick={handleDeleteNote} id={note.id}>🗑</button>
          </div>
          <Suspense>
            <Await resolve={notePromise} errorElement={<Navigate to={'/*'}/>}>
              {() => (
                <>
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      value={note.title}
                      onChange={(e) =>
                        setNote((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="bg-gray-200"
                    />
                    <textarea
                      value={note.text}
                      onChange={(e) => {
                        setNote((prev) => ({ ...prev, text: e.target.value }));
                      }}
                      className="bg-gray-200 h-full resize-y"
                    />
                  </div>
                  <button onClick={handleSaveNote} className='bg-gray-200 font-semibold  w-1/3 mx-auto'>Save</button>
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </>
    );
  }