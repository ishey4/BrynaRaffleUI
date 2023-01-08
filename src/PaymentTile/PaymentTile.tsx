import { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js"

import { AppContext } from "../AppContext";


import { Button, Input, Select } from "antd";

import { useChargeCard } from "../API/chargeCard";
import { PaymentSuccess } from "./PaymentSuccess";
import { PaymentFailed } from "./PaymentFailed";

import './PaymentStyles.css'

export interface ICard {
    number: string,
    exp_month: number,
    exp_year: number,
    cvc: string,

}

const getMonth = (exp: string) => exp.substring(0, 2)
const getYear = (exp: string) => exp.substring(3, 7)

export const PaymentTile = () => {
    const { paymentAmount, tickets } = useContext(AppContext)
    const [card, setCard] = useState<ICard>({} as any)
    const [exp, setExp] = useState('')
    const { chargeCard, isLoading, isSuccess, isError } = useChargeCard()

    const shouldShowPayButton = paymentAmount > 0 && !(isSuccess || isError);

    const isCardValid = (/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/).test(card.number);
    const isValidCVC = /^[0-9]{3,4}$/.test(card.cvc);
    const isValidExp = /^(0[1-9]|1[0-2])\/[0-9]{4}$/.test(exp);
    const disablePaymentButton = isLoading || !isValidCVC || !isCardValid || !isValidExp;
    const unpaidTickets = tickets.filter(({ transactionId }) => !transactionId)

    return <>
        {shouldShowPayButton && <div className='fieldContainer'>
            <Input status={isCardValid ? '' : 'error'} type="text" placeholder="Card Number" autoComplete="cc-number" value={card.number} onChange={(e) => {
                setCard({ ...card, number: e.target.value })
            }} />

            <Input status={isValidExp ? '' : 'error'} autoComplete="cc-exp" placeholder="MM/YYYY" value={exp} onChange={(e) => setExp(e.target.value)} />
            <Input status={isValidCVC ? '' : 'error'} type="text" autoComplete="cc-csv" placeholder="CVC" onChange={(e) => setCard({ ...card, cvc: e.target.value })} />

            <div className="buttonGroup">
                <Button loading={isLoading} disabled={disablePaymentButton} className="button" onClick={() => {
                    const cartToUse = {
                        ...card,
                        exp_month: parseInt(getMonth(exp)),
                        exp_year: parseInt(getYear(exp))
                    }
                    chargeCard({ amount: paymentAmount * 100, card: cartToUse, tickets: unpaidTickets })
                }}>Pay ${paymentAmount}</Button></div>

        </div >}
        {isSuccess && <PaymentSuccess />}
        {isError && <PaymentFailed />}
    </>
}