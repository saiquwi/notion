export default function deleteNote(id) {
        fetch(`http://localhost:5001/notes/${id}`, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
           }
        })
}
