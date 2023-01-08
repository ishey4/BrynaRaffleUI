import { useState } from "react"
import { useUserData } from "../Hooks/useUserData"
import { ICard } from "../PaymentTile/PaymentTile"
import { CHARGE_CARD, HOST } from "./APIEndpoints"
import { TTicket } from "./types"

export const _chargeCard = ({ userId, email, amount, card, ticketIds }: any): Promise<any> => {
    const body = JSON.stringify({ userId, email, amount, card, ticketIds })
    const headers = { 'Content-Type': 'application/json' }

    return fetch(`${HOST}${CHARGE_CARD}`, { method: 'POST', body, headers }).then((resp) => {
        if (resp.status !== 200) {
            throw new Error('Payment Error')
        };

        return resp.json()
    })
}

export const useChargeCard = () => {
    const { email, userID } = useUserData();
    const [isLoading, setIsLoading] = useState(false)

    const [isError, setIsError] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const chargeCard = ({ amount, card, tickets }: { amount: number, card: ICard, tickets: TTicket[] }) => {
        setIsLoading(true);
        const ticketIds = tickets.map(({ uid }) => uid)
        return _chargeCard({ email, userId: userID, amount, card, ticketIds })
            .then((data) => {
                setIsSuccess(data)
            })
            .catch(setIsError)
            .finally(() => setIsLoading(false))
    }

    return { isLoading, chargeCard, isSuccess, isError }
}