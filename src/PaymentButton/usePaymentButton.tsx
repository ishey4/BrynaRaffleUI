import { useContext, useState } from "react";

import { StripeCardElement } from "@stripe/stripe-js";
import { useElements } from "@stripe/react-stripe-js"
import { useStripe as useStripeLib } from '@stripe/react-stripe-js'

import { AppContext } from "../AppContext";
import { useChargeCard } from "../API/chargeCard";

export const usePaymentButton = () => {
    const stripe = useStripeLib();
    const elements = useElements();
    const { chargeCard } = useChargeCard()
    const [paymentStatus, setPaymentStatus] = useState<string>('')
    const { paymentAmount, tickets, updateTickets } = useContext(AppContext)

    const buttonText = !paymentStatus ? `Pay $${paymentAmount}` : paymentStatus
    const ticketIds = tickets
        .filter(({ transactionId }) => !transactionId)
        .map(({ uid }) => uid)

    const click = () => {
        const elm = elements?.getElement('card') as StripeCardElement
        stripe?.createToken(elm).then((token) => {
            setPaymentStatus('Processing')
            chargeCard({ ticketIds, amount: paymentAmount * 100, token: token.token?.id })
                .then(({ status }) => {
                    setPaymentStatus(status || 'Error');
                    setTimeout(updateTickets, 500);

                })
                .catch(() => { setPaymentStatus("Error") })
        })
    }

    return { paymentStatus, click, buttonText }
}