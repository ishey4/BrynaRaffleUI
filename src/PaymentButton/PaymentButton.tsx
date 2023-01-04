
import { Button } from "antd";
// import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"
import { CardElement, PaymentElement } from "@stripe/react-stripe-js"
import { usePaymentButton } from "./usePaymentButton";
import './PaymentButton.css'

export const PaymentButton = () => {
    const { paymentStatus, click, buttonText } = usePaymentButton()

    return <div className="paymentArea">
        <div className="container"> <PaymentElement /></div>
        <Button className="button" disabled={!!paymentStatus} onClick={click}>{buttonText}</Button>
    </div>

}