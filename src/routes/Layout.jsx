import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";

export default function Layout() {
    const { user } = useContext(UserContext)

    const handleLogOut = () => {
        localStorage.clear()
    }

    return (
        <div>
            <div className='flex flex-row justify-between'>
                <div className='w-1/3 font-bold text-start'>Hello, {user.email}</div>
                <div className='flex flex-row justify-end gap-4 w-1/3'>
                    <NavLink to='/' end={true} className='no-underline font-bold'>About</NavLink>
                    <NavLink to='/notes' className='no-underline font-bold'>Notes</NavLink>
                    <NavLink to='/login' onClick={handleLogOut} className='no-underline font-bold'>Log out</NavLink>
                </div>
            </div>
          <div className="grid grid-cols-1 gap-4">
          <main className="mx-auto">
            <Outlet />
          </main>
            <div className="block px-7 py-16 text-gray-400 text-2xs bg-white">
              <hr/>
              <div className="flex flex-row justify-between">
              <span>
                Created by: Maya Krizhevich
              </span>
              <span>
                BSU: 2023
              </span>
              </div>
            </div>
            </div>
        </div>
      )
}