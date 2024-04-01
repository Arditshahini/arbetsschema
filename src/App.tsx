import React, { useEffect, useState } from 'react'
import './App.css'
import { CreateUser } from './components/CreateUser'
import { UserList } from '../src/components/UserList/UserList'

import {
    createUserWithEmailAndPassword,
    getAuth,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from 'firebase/auth'

const auth = getAuth()

// user hook
export function useUser() {
    const [user, setUser] = useState(null)

    // run only when dependancies changed
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            setUser(u)
        })
    }, [])

    return user
}

function App() {
    const user = useUser()
    const [showUserList, setShowUserList] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onCreateAccount() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user

                // ...
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // ..
            })
    }

    function onLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                // ...
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
            })
    }

    function onLogout() {
        const auth = getAuth()
        signOut(auth)
            .then(() => {})
            .catch((error) => {})
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    {!auth.currentUser && (
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />

                            <div>
                                <button onClick={onLogin}>Login</button> or{' '}
                                <button onClick={onCreateAccount}>
                                    Create account
                                </button>
                            </div>
                        </div>
                    )}

                    {auth.currentUser && (
                        <div>
                            <div>
                                <span>Hi {auth.currentUser.email}!</span>
                                <button onClick={onLogout}>logout</button>
                            </div>

                            <button
                                style={{
                                    backgroundColor: showUserList
                                        ? '#3c425c'
                                        : 'white'
                                }}
                                className="TabButton"
                                onClick={() => setShowUserList(false)}
                            >
                                Skapa uppdrag
                            </button>
                            <button
                                style={{
                                    backgroundColor: showUserList
                                        ? 'white'
                                        : '#3c425c'
                                }}
                                className="TabButton"
                                onClick={() => setShowUserList(true)}
                            >
                                Lista uppdrag
                            </button>
                            {showUserList ? <UserList /> : <CreateUser />}
                        </div>
                    )}
                </div>
            </header>
        </div>
    )
}

export default App
