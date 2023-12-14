import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

export default function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const id = localStorage.getItem('userId')
        if (id) {
            fetch(`http://localhost:5001/users/${id}`)
                .then((r) => r.json())
                .then((user) => {
                    setUser(user)
                    setLoading(false)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (user?.id) {
            localStorage.setItem('userId', user.id)
        }
    }, [user?.id]
    )

    return (
        <UserContext.Provider value={{user, onChange: setUser, loading}}>
            {children}
        </UserContext.Provider>
    )
}