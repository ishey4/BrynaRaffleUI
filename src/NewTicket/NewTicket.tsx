import { Button } from "antd"
import { TTicket } from "../API/types"
import { SlotsSpinner } from "../SlotsSpinner/SlotsSpinner"
import { useNewTicket } from "./useNewTicket"

import "./NewTicket.css"

export interface IGetTicketProps {
    ticket: TTicket | null
}

export const NewTicketComponent = (props: IGetTicketProps) => {
    const { selectedNumberArray, newTicket, buttonText, shouldSpin } = useNewTicket(props)

    return <div className="NewTicketComponent">
        <SlotsSpinner selectedNumberArray={selectedNumberArray} shouldSpin={shouldSpin} />
        <Button disabled={!shouldSpin} onClick={newTicket}>{buttonText}</Button>
    </div>
}