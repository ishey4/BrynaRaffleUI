import { useContext } from "react"
import { TTicket } from "../API/types"
import { AppContext } from "../AppContext"
import { IGetTicketProps } from "./NewTicket"

export const useNewTicket = ({ ticket }: IGetTicketProps) => {
    const { getTicket, addTicket } = useContext(AppContext)

    const buttonText = ticket?.transactionId ? 'Paid' : ticket ? `${ticket?.ticketNumber}` : 'Get Ticket'
    const newTicket = () => getTicket().then(addTicket)
    const shouldSpin = !ticket

    const selectedNumberArray = shouldSpin ?
        [0, 0, 0] :
        Array.from(
            ticket.ticketNumber
                .toString()
                .padStart(3, '0'))
            .map((number: string) => parseInt(number, 10))

    return { selectedNumberArray, newTicket, buttonText, shouldSpin }
}