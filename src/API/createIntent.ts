import { useContext, useEffect, useState } from "react"
import { loadStripe, PaymentIntent, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { CREATE_PAYMENT_INTENT, HOST } from "./APIEndpoints";
import { AppContext } from "../AppContext";

const getIntent = (amount: number) => {
    const body = JSON.stringify({ amount })
    const headers = { 'Content-Type': 'application/json' }
    return fetch(`${HOST}${CREATE_PAYMENT_INTENT}`, { method: 'POST', body, headers }).then((resp) => resp.json())
}

export const useCreateIntent = () => {
    const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>()
    const [stripeOptions, setStripeOptions] = useState<StripeElementsOptions>({});
    const [isLoading, setIsLoading] = useState(true)


    const createNewIntent = (amount: number) => {
        setIsLoading(true)
        getIntent(amount)
            .then(setPaymentIntent)
            .finally(() => setIsLoading(false))
    };


    useEffect(() => {
        if (paymentIntent) {
            setStripeOptions({
                clientSecret: paymentIntent?.client_secret || ''
            })
        }
    }, [paymentIntent])


    return { createNewIntent, stripeOptions, isLoading }
}