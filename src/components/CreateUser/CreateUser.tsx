import React, { useState } from 'react'
import { TextInput } from '../TextInput'
import styles from './CreateUser.module.css'
import { useCreateUserMutation } from '../../store/api/usersApi'


export const CreateUser = () => {
    const [createUser] = useCreateUserMutation()

    const [clientInfo, setClientInfo] = useState('')
    const [clientName, setClientName] = useState('')
    const [workDescription, setWorkDescription] = useState('')
    const [status, setStatus] = useState('')
    const [feedback, setFeedback] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const submitHandler = () => {
        if (clientInfo !== '' && clientName !== '') {
            setFeedback(`Hej, ${clientInfo} ${clientName}, välkommen!`)
            setSubmitted(true)
            setClientInfo('')
            setClientName('')
            setTimeout(() => {
                setFeedback('')
            }, 5000)

            createUser({
                user: {
                    clientInfo: clientInfo,
                    clientName: clientName,
                    workDescription: workDescription,
                    status:status,
                    pictures:[]

                }
            })
        } else {
            setSubmitted(false)
            setFeedback('Du måste fylla i alla fält!')
        }
    }

    return (
        <div className={styles.container}>
            <TextInput
                value={clientName}
                placeholder="Namn"
                onInput={(event) => {
                    setClientName(event.target.value)
                }}
            />
            <TextInput
                value={clientInfo}
                placeholder="Adress"
                onInput={(event) => {
                    setClientInfo(event.target.value)
                }}
            />
            <TextInput
                value={workDescription}
                placeholder="Arbetsbeskrivning"
                onInput={(event) => {
                    setWorkDescription(event.target.value)
                }}
            />
            <TextInput
                value={status}
                placeholder="status"
                onInput={(event) => {
                    setStatus(event.target.value)
                }}
            />
            <button className={styles.submitButton} onClick={submitHandler}>
                Lägg till arbete
            </button>
            <p
                className={styles.feedbackText}
                style={{ color: submitted ? '#3c425c' : '#ed4e59' }}
            >
                {feedback}
            </p>
        </div>
    )
}
