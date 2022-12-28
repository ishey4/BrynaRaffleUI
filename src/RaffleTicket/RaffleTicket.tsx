import { TTicket } from '../API/types'
import raffleTicket from '../Images/RaffleTicket.png'

import './RaffleTicket.css'

export interface IRaffleTicketProps {
    ticket: TTicket | null
}


export const RaffleTicket = ({ ticket }: IRaffleTicketProps) => {
    return <div className='ticketContainer'>
        <div className='ticketNumber'>{ticket?.ticketNumber}</div>
        <img className='ticket' src={raffleTicket}></img>
    </div>
}