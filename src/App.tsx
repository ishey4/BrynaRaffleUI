import { useState } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import Card from 'antd/es/card';

import { PaymentTile } from './PaymentTile/PaymentTile';
import { useUserData } from './Hooks/useUserData';
import { AppContext } from './AppContext';
import { NewTicketComponent } from './NewTicket/NewTicket';
import { PaymentIntent } from '@stripe/stripe-js';
import { useGetTicket } from './API/getTicket';
import { useTickets } from './Hooks/useTickets';

import 'antd/dist/reset.css';
import './App.css';

function App() {
  const { getTicket } = useGetTicket()
  const { tickets, addTicket, addTickets, updateTickets } = useTickets()
  const { name, email, setName, setEmail } = useUserData()

  const [BuyNow, _setBuyNow] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState<number>(0)
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null)


  const total = tickets.reduce((acc, ticket) => {
    const ticketPrice = ticket.transactionId ? '0' : ticket.ticketNumber
    return acc + parseInt(ticketPrice) || 0
  }, 0)

  const setBuyNow = () => {
    setPaymentAmount(total)
    _setBuyNow(true)
  }

  const contextValue = { updateTickets, getTicket, addTicket, addTickets, tickets, paymentAmount, setPaymentAmount, paymentIntent, setPaymentIntent }
  const showPaymentButton = total > 0 && tickets.length && !BuyNow

  return (
    <AppContext.Provider value={contextValue}>
      <div className='App'>
        <Card title="Contact Info">
          <Input onChange={(e) => setName(e.target.value)} bordered={false} type='text' placeholder='Name' value={name} />
          <Input bordered={false} type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </Card>
        <Card title="Ticket Info" bordered={false}>
          {tickets.map((ticket) => <NewTicketComponent ticket={ticket} />)}
          {!BuyNow && <NewTicketComponent ticket={null} />}

          <div className='ButyNow'>
            {BuyNow && <PaymentTile />}
            {showPaymentButton && <Button onClick={setBuyNow}>Buy Now (${total})</Button>}
          </div>

        </Card>

      </div>
    </AppContext.Provider>
  );
}

export default App;
