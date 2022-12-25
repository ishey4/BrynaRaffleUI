import { useState } from "react"
import { useUserData } from "../Hooks/useUserData"
import { CHARGE_CARD, HOST } from "./APIEndpoints"

export const _chargeCard = ({ userId, email, amount, token, ticketIds }: any): Promise<any> => {
    const body = JSON.stringify({ userId, email, amount, token, ticketIds })
    const headers = { 'Content-Type': 'application/json' }

    return fetch(`${HOST}${CHARGE_CARD}`, { method: 'POST', body, headers }).then((resp) => resp.json())
}

export const useChargeCard = () => {
    const { email, userID } = useUserData();
    // const [reserverdTickets, setReservedTickets] = useState<TTicket[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    const chargeCard = ({ amount, token, ticketIds }: any) =>
        _chargeCard({ email, userId: userID, amount, token, ticketIds })
            // .then(setReservedTickets)
            .finally(() => setIsLoading(false))


    return { isLoading, chargeCard }
}