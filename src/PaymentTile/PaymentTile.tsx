import { useContext, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js"

import { AppContext } from "../AppContext";
import { useStripe } from "../Hooks/useStripe";
import { PaymentButton } from "../PaymentButton/PaymentButton";


let amount = 0;

export const PaymentTile = () => {
    const { paymentAmount } = useContext(AppContext)
    const { stripeOptions, stripePromise, isLoading, createPaymentIntent } = useStripe()

    useEffect(() => {
        if (amount != paymentAmount) {
            amount = paymentAmount
            createPaymentIntent(paymentAmount)
        }
    }, [])

    return <>{isLoading ? null :
        <Elements stripe={stripePromise} options={stripeOptions}>
            <PaymentButton />
        </Elements >
    }</>
}