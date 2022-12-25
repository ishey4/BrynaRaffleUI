import { useEffect, useState } from "react"
import { getPublishableKey } from "../API/getPublishableKey"

export const useGetStripePublishableKey = () => {
    const [stripePublishableKey, setStripePublishableKey] = useState('')
    
    useEffect(() => {
        getPublishableKey().then((key) => {
            setStripePublishableKey(key)
        })
    }, [])

    const loading = !stripePublishableKey

    return { loading, stripePublishableKey }
}