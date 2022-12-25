import { Button } from "antd"
import { useContext } from "react"
import { TTicket } from "../API/types"
import { AppContext } from "../AppContext"
import { SlotsSpinner } from "../SlotsSpinner/SlotsSpinner"

export const NewTicketComponent = ({ ticket }: { ticket: TTicket | null }) => {
    const { getTicket, addTicket } = useContext(AppContext)

    const newTicket = () => {
        getTicket().then(addTicket)
    }

    const shouldSpin = !ticket

    const selectedNumberArray = shouldSpin ?
        [0, 0, 0] :
        Array.from(
            ticket.ticketNumber
                .toString()
                .padStart(3, '0'))
            .map((number: string) => parseInt(number, 10))


    const buttonText = ticket?.transactionId ? 'Paid' : ticket ? `${ticket?.ticketNumber}` : 'Get Ticket'
    return <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
        <SlotsSpinner selectedNumberArray={selectedNumberArray} shouldSpin={shouldSpin} />
        <Button style={{ minWidth: '75px', margin: '5px' }} disabled={!shouldSpin} onClick={newTicket}>{buttonText}</Button>
    </div>
}