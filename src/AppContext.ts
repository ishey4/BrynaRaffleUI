import { PaymentIntent } from "@stripe/stripe-js";
import { createContext } from "react";
import { TTicket } from "./API/types";

export interface IAppContext {
    paymentIntent: PaymentIntent | null;
    setPaymentIntent: (paymentIntent: PaymentIntent | null) => void;

    paymentAmount: number;
    setPaymentAmount: (paymentAmount: number) => void

    tickets: TTicket[];
    addTickets: (reservedTickets: TTicket[]) => void
    addTicket: (reservedTickets: TTicket) => void

    getTicket: () => Promise<TTicket>
    updateTickets: () => void
}

export const AppContext = createContext<IAppContext>({} as any)
