import { useContext, useEffect, useState } from "react"
import { AppContext } from "../AppContext"
import { useUserData } from "../Hooks/useUserData"
import { GET_TICKET, HOST, REMOVE_TICKET } from "./APIEndpoints"
import { TTicket } from "./types"

export const removeTicket = (ticket: TTicket) => {
    const body = JSON.stringify({ ticket })
    const headers = { 'Content-Type': 'application/json' }

    return fetch(`${HOST}${REMOVE_TICKET}`, { method: 'POST', body, headers })
}

export const useRemoveTicket = (ticket: TTicket) => {
    const { updateTickets } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const _removeTicket = () => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        removeTicket(ticket).then((resp) => {
            if (resp.status === 204) { setIsSuccess(true) }
            else { setIsError(true) }
        })
            .finally(() => {
                setIsLoading(false)
                updateTickets();
            })
    }
    return { removeTicket: _removeTicket, isLoading, isError, isSuccess }
}