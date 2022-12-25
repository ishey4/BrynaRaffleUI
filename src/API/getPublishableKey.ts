import { GET_PUBLISHABLE_KEY, HOST } from "./APIEndpoints";

export const getPublishableKey = () => {
    console.log("fetching", { HOST, GET_PUBLISHABLE_KEY })
    return fetch(`${HOST}${GET_PUBLISHABLE_KEY}`)
        .then((resp) => resp.json())
        .then(({ key }: any) => key as string)

}