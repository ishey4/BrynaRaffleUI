import { useState } from "react";

export const useUserData = () => {
    const [email, _setEmail] = useState(window.localStorage.getItem('userEmail') || '')
    const [name, _setName] = useState(window.localStorage.getItem('userName') || '')
    const userID = window.localStorage.getItem('userID') || crypto.randomUUID();

    window.localStorage.setItem('userID', userID);

    const setEmail = (value: string) => {
        _setEmail(value)
        window.localStorage.setItem('userEmail', value);
    }

    const setName = (value: string) => {
        _setName(value)
        window.localStorage.setItem('userName', value);
    }

    return { userID, email, name, setEmail, setName }
}