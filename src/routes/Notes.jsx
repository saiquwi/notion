import { Suspense } from "react"
import { Await, Link, Navigate, useLoaderData, useNavigate } from "react-router-dom"
import deleteNote  from "../utils/delete"

export const loader = async () => {
    const id = localStorage.getItem("userId")
    const notesPromise = fetch(`http://localhost:5001/notes?authorId=${id}`,
                          {headers:{
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache'
                           }}
                            )
                            .then((r) => r.json())
    return { notesPromise }
}

export default function Notes() {
    const {notesPromise} = useLoaderData()

    const navigate = useNavigate()

    function handleViewNote(e) {
      localStorage.setItem('noteId', e.target.id)
      navigate('/note')
    }

    function handleEditNote(e) {
      localStorage.setItem('noteId', e.target.id)
      navigate('/editnote')
    }

    function handleDeleteNote(e) {
      deleteNote(e.target.id)
      navigate('/notes')
    }  

    return <>
        <div className='prose flex flex-col gap-4 mt-6 w-screen'>
            <h1 className="m-0">Notes</h1>
            <Link to={`/newnote`} className='bg-gray-200 font-semibold w-1/3 mx-auto no-underline'>Add new note</Link>
            <Suspense>
                <Await resolve={notesPromise} errorElement={<Navigate to={'/*'}/>}>
                    {(notes) => {
                        return (
                            notes.sort((a, b) => ((a.date < b.date) ? 1 : -1))
                                 .map((note) => (
                                <div key={note.id} className="flex flex-row w-5/6 justify-between mx-auto px-2 bg-gray-200">
                                  <div id={note.id} onClick={handleViewNote} className="flex flex-row gap-2 justify-start w-5/6">
                                    <span className="font-semibold" id={note.id}>{note.title}</span>
                                    <div className="pt-2 text-xs text-gray-400" id={note.id}>{new Date(note.date).toLocaleString()}</div>
                                  </div>
                                  <div className="flex flex-row gap-2 justify-around w-1/6">
                                    <button onClick={handleEditNote} id={note.id}>✍️</button>
                                    <button onClick={handleDeleteNote} id={note.id}>🗑</button>
                                  </div>
                                </div>
                            ))
                        )
                    }}
            </Await>
            </Suspense>
        </div>
    </>
}