import './App.css';
import Login from './routes/Login.jsx'
import Home from './routes/Home.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import UserContextProvider from './components/UserContextProvider.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import SignUp from './routes/SignUp.jsx';
import Page404 from './routes/Page404.jsx';
import Layout from './routes/Layout.jsx';
import Notes, {loader as notesLoader} from './routes/Notes.jsx';
import Note, {loader as noteLoader} from './routes/Note.jsx';
import NewNote from './routes/NewNote.jsx';
import EditNote, {loader as editLoader} from './routes/EditNote.jsx';

//в качестве примера создан один пользователь (email: a@gmail.com, password: aA123456)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: '/notes',
        loader: notesLoader,
        element: (
          <RequireAuth>
            <Notes />
          </RequireAuth>
        )
      },
      {
        path: '/newnote',
        element: (
          <RequireAuth>
            <NewNote />
          </RequireAuth>
        ),
      },
      {
        path: '/note',
        loader: noteLoader,
        element: (
          <RequireAuth>
            <Note />
          </RequireAuth>
        ),
      },
      {
        path: '/editnote',
        loader: editLoader,
        element: (
          <RequireAuth>
            <EditNote />
          </RequireAuth>
        ),
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/*',
    element: <Page404 />,
  },
  {
    path: '/signup',
    element: <SignUp />
  },
])

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App