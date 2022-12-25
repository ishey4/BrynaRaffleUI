import { Elements } from "@stripe/react-stripe-js"

import { useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";
import { useStripe } from "./Hooks/useStripe";
import { PaymentButton } from "./PaymentButton";


let amount = 0;

export const PaymentTile = () => {

    const { paymentAmount } = useContext(AppContext)
    const { stripeOptions, stripePromise, isLoading, createPaymentIntent } = useStripe()

    useEffect(() => {
        if (amount != paymentAmount) { // seem to have abug, that this get duplicated :(
            amount = paymentAmount
            createPaymentIntent(paymentAmount)
        }
    }, [])

    console.log("isLoading", { isLoading })

    return <>{isLoading ? null :
        <Elements stripe={stripePromise} options={stripeOptions}>
            <PaymentButton />
        </Elements >
    }</>
}