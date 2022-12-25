import { useEffect, useState } from "react"
import { useCheckForTicket } from "../API/checkForTicket"
import { TTicket } from "../API/types"

export const useTickets = () => {
    const { getReservedTickets } = useCheckForTicket()
    const [_tickets, _setTickets] = useState<TTicket[]>([])
    const addTicket = (ticket: TTicket) => { _setTickets([..._tickets, ticket]) }
    const addTickets = (tickets: TTicket[]) => _setTickets([...tickets, ..._tickets])

    const updateTickets = () => getReservedTickets().then(_setTickets)

    useEffect(() => { updateTickets() }, [])

    return { tickets: _tickets, addTickets, addTicket, updateTickets }
}