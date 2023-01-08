import { useState } from "react"
import { useUserData } from "../Hooks/useUserData"
import { GET_TICKET, HOST } from "./APIEndpoints"
import { TTicket } from "./types"

export const getTicket = ({ userId, email }: any): Promise<TTicket> => {
    const body = JSON.stringify({ userId, email })
    const headers = { 'Content-Type': 'application/json' }

    return fetch(`${HOST}${GET_TICKET}`, { method: 'POST', body, headers }).then((resp) => resp.json())
}

export const useGetTicket = () => {
    const { email, userID } = useUserData();
    const [isLoading, setIsLoading] = useState(false)

    const _getTicket = () => {
        setIsLoading(true);
        return getTicket({ email, userId: userID }).finally(() => setIsLoading(false))
    }

    return { getTicket: _getTicket, isLoading }
}