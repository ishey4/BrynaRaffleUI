
import { Button } from "antd";
import { CardElement } from "@stripe/react-stripe-js"
import { usePaymentButton } from "./usePaymentButton";
import './PaymentButton.css'

export const PaymentButton = () => {
    const { paymentStatus, click, buttonText } = usePaymentButton()

    return <div className="PaymentButton">
        <div className="CardElement">
        <CardElement  />
        </div>
        <Button className="PayButton" disabled={!!paymentStatus} onClick={click}>{buttonText}</Button>
    </div>

}