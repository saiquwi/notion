import { Suspense } from "react"
import { Await, Link, Navigate, useLoaderData , useNavigate} from "react-router-dom"
import  deleteNote  from "../utils/delete"

export const loader = async () => {
    const id = localStorage.getItem("noteId")
    const authorId = localStorage.getItem("userId") //для исключения возможности подстановки данных в local storage
    const query = new URLSearchParams({
        id,
        authorId,
    }).toString()
    const notePromise = await fetch(`http://localhost:5001/notes?${query}`)
                            .then((r) => r.json())
                            .then((notes) => notes[0])
    return { notePromise }
}

export default function Note() {
    const {notePromise} = useLoaderData()
    const navigate = useNavigate()

    function handleDeleteNote(e) {
        deleteNote(e.target.id)
        navigate('/notes')
    }

    return <>
    <Suspense>
            <Await resolve={notePromise} errorElement={<Navigate to={'/*'}/>}>
                    {(note) => {
                        return <>    
                            <div className='prose flex flex-col gap-4 mt-6 w-screen'>
                                <div className='flex flex-row justify-between content-center'>
                                    <Link to={`/notes`} className='bg-gray-200 px-1 h-5/6  no-underline'>Back</Link>
                                    <h1 className='m-0'>{note.title}</h1>
                                    <div>
                                        <Link to={`/editnote`} className="no-underline mr-2 text-lg">✍️</Link>
                                        <button onClick={handleDeleteNote} id={note.id} className="text-lg">🗑</button>
                                    </div>
                                </div>
                                <div className='bg-gray-200 text-start px-2 break-words'>{note.text}</div>
                            </div>
                        </>
                    }}
          </Await>
      </Suspense>
  </>    
}