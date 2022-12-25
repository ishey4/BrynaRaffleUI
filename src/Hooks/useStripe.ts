import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { useCreateIntent } from "../API/createIntent";
import { AppContext } from "../AppContext";
import { useGetStripePublishableKey } from "./useGetStripePublishableKey"

export const useStripe = () => {
    const { isLoading: intentLoading, stripeOptions, createNewIntent } = useCreateIntent()
    const { stripePublishableKey, loading: keyLoading } = useGetStripePublishableKey()
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(Promise.resolve(null));

    const isLoading = intentLoading || keyLoading || !stripeOptions.clientSecret

    const createPaymentIntent = (amount: number) => {
        createNewIntent(amount * 100)
    }

    useEffect(() => {
        if (stripePublishableKey) {
            setStripePromise(loadStripe(stripePublishableKey))
        }
    }, [stripePublishableKey]);

    return { stripePromise, stripeOptions, isLoading, createPaymentIntent }
}