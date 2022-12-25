
import { useContext, useState } from "react";
import { Button } from "antd";

import { StripeCardElement } from "@stripe/stripe-js";
import { CardElement, useElements } from "@stripe/react-stripe-js"
import { useStripe as useStripeLib } from '@stripe/react-stripe-js'

import { AppContext } from "./AppContext";
import { useChargeCard } from "./API/chargeCard";



export const PaymentButton = () => {
    const stripe = useStripeLib();
    const [paymentStatus, setPaymentStatus] = useState<string>('')
    const { paymentAmount, tickets, updateTickets } = useContext(AppContext)
    const elements = useElements();
    const { chargeCard } = useChargeCard()



    const click = () => {
        const elm = elements?.getElement('card') as StripeCardElement
        stripe?.createToken(elm).then((token) => {
            setPaymentStatus('Processing')
            chargeCard({ ticketIds: tickets.map(({ uid }) => uid), amount: paymentAmount * 100, token: token.token?.id })
                .then(({ status }) => { updateTickets(); setPaymentStatus(status || 'Error'); console.log('status', { status }) })
                .catch(() => { setPaymentStatus("Error") })
        })
    }

    const buttonText = !paymentStatus ? `Pay $${paymentAmount}` : paymentStatus

    return <>
        <div style={{ width: '50%', minWidth: '250px', textAlign: "right" }}>
            <CardElement />
            <Button disabled={!!paymentStatus} onClick={click}>{buttonText}</Button>
        </div>
    </>
}