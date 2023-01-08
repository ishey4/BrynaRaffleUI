import { useRemoveTicket } from '../API/removeTicket'
import { TTicket } from '../API/types'
import raffleTicket from '../Images/RaffleTicket.png'
import { LoadingSpinner } from '../Spinner/Spinner'

import './RaffleTicket.css'

export interface IRaffleTicketProps {
    ticket: TTicket | null
}

export const RaffleTicket = ({ ticket }: IRaffleTicketProps) => {
    const { removeTicket, isLoading } = useRemoveTicket(ticket || {} as TTicket)

    return <div className='ticketArea displayFlex'>
        <div className='ticketContainer'>

            <div className='ticketNumber'>{ticket?.ticketNumber}</div>
            <img className='ticket' src={raffleTicket}></img>
        </div>
        <div onClick={removeTicket} className='cancelButton'>{
            isLoading ?
                <LoadingSpinner /> :
                'X Cancel'}
        </div>
    </div>
}