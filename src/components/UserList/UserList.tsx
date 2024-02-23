import React, { useState } from 'react'
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} from '../../store/api/usersApi'

export function UserList() {
    const { data, isLoading, refetch } = useGetUsersQuery({})
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()
    const [deletingUserId, setDeletingUserId] = useState(null)
    const [editingUserId, setEditingUserId] = useState(null)
    const [updatedUserData, setUpdatedUserData] = useState({
        clientName: '',
        clientInfo: '',
        workDescription: '',
        pictures: [],
        status:''
    })

    const handleDeleteUser = async (userId) => {
        try {
            setDeletingUserId(userId)
            await deleteUser({ userId })
            refetch()
        } catch (error) {
            console.error(`Ett fel uppstod vid radering: ${error.message}`)
        } finally {
            setDeletingUserId(null)
        }
    }

    const handleEditUser = (userId, user) => {
        setEditingUserId(userId)
        setUpdatedUserData(user)
    }

    const handleUpdateUser = async (userId) => {
        try {
            // Anropa updateUser-mutationen för att uppdatera användaren med uppdaterade uppgifter.
            await updateUser({ userId, updatedData: updatedUserData })
            setEditingUserId(null)
            refetch()
        } catch (error) {
            console.error(`Ett fel uppstod vid uppdatering: ${error.message}`)
        }
    }

    const renderUserList = () => {
        if (isLoading) {
            return <div>Laddar användare...</div>
        }

        if (!data || data.length === 0) {
            return (
                <div>
                    Ingen data tillgänglig.
                    <button onClick={refetch}>Hämta på nytt</button>
                </div>
            )
        }

        return (
            <div>
                <h2>Uppdrag:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Förnamn</th>
                            <th>Efternamn</th>
                            <th>Åtgärder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td
                                    onClick={() =>
                                        handleEditUser(user.id, user)
                                    }
                                    style={{ cursor: 'pointer' }}
                                >
                                    {editingUserId === user.id ? (
                                        <input
                                            type="text"
                                            value={updatedUserData.clientName}
                                            onChange={(e) =>
                                                setUpdatedUserData({
                                                    ...updatedUserData,
                                                    clientName: e.target.value
                                                })
                                            }
                                        />
                                    ) : (
                                        user.clientName
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            type="text"
                                            value={updatedUserData.clientInfo}
                                            onChange={(e) =>
                                                setUpdatedUserData({
                                                    ...updatedUserData,
                                                    clientInfo: e.target.value
                                                })
                                            }
                                        />
                                    ) : (
                                        user.clientInfo
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <button
                                            onClick={() =>
                                                handleUpdateUser(user.id)
                                            }
                                        >
                                            Uppdatera
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleDeleteUser(user.id)
                                            }
                                            disabled={
                                                deletingUserId === user.id
                                            }
                                        >
                                            {deletingUserId === user.id
                                                ? 'Raderar...'
                                                : 'Radera'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>{' '}
                <button onClick={refetch}>Hämta på nytt</button>
            </div>
        )
    }

    return <div>{renderUserList()}</div>
}
