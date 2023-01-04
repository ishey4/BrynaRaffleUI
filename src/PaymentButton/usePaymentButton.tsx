import { useContext, useState } from "react";

import { useElements, CardElement } from "@stripe/react-stripe-js"
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

    const click = async () => {
        const elm = elements?.getElement('payment') as any
        alert("no payment method set up yet :(")
        // if (elements && stripe) {
        //     stripe?.createSource(elm, {}).then((data) => {
        //         console.log("data", { data })
        //         //setPaymentStatus(error ? 'Error' : 'Success ');
        //         setTimeout(updateTickets, 500);
        //     }).catch(console.error)
        // }

        // stripe?.createToken().then((token) => {
        //     setPaymentStatus('Processing')
        //     chargeCard({ ticketIds, amount: paymentAmount * 100, token: token.token?.id })
        //         .then(({ status }) => {
        //             setPaymentStatus(status || 'Error');
        //             setTimeout(updateTickets, 500);

        //         })
        //         .catch(() => { setPaymentStatus("Error") })
        // })
    }

    return { paymentStatus, click, buttonText }
}