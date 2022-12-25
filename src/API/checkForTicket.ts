import { useState } from "react";
import { useUserData } from "../Hooks/useUserData";
import { CEHECK_FOR_RESERVED_TICKETS, HOST } from "./APIEndpoints";
import { TTicket } from "./types";

export const checkForTicket = ({ userId, email }: any): Promise<TTicket[]> => {
    const body = JSON.stringify({ userId, email })
    const headers = { 'Content-Type': 'application/json' }

    return fetch(`${HOST}${CEHECK_FOR_RESERVED_TICKETS}`, { method: 'POST', body, headers }).then((resp) => resp.json())
}

export const useCheckForTicket = () => {
    const { email, userID } = useUserData();
    const [isLoading, setIsLoading] = useState(true)

    const getReservedTickets = () =>
        checkForTicket({ email, userId: userID })
            .finally(() => setIsLoading(false))


    return { isLoading, getReservedTickets }
}