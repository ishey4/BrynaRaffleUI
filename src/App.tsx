import { useState } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';

import { PaymentIntent } from '@stripe/stripe-js'
  ;
import { PaymentTile } from './PaymentTile/PaymentTile';
import { useUserData } from './Hooks/useUserData';
import { AppContext } from './AppContext';
import { useGetTicket } from './API/getTicket';
import { useTickets } from './Hooks/useTickets';
import { RaffleTicket } from './RaffleTicket/RaffleTicket';
import { Header } from './Header/Header';
import { SubHeader } from './SubHeader/SubHeader';
import { Seperator } from './Seperator/Seperator';
import { TicketsRemaining } from './TicketsRemaining/TicketsRemaining';

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
  const unpaidTickets = tickets.filter(({ transactionId }) => !transactionId)

  const newTicket = () => {
    getTicket().then(addTicket)
  }

  const nameStatus = !name ? "error" : ''
  const emailStatus = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? '' : 'error'

  const showGetTicket = !nameStatus && !emailStatus

  return (
    <AppContext.Provider value={contextValue}>
      <div className='App'>
        <Header />
        <SubHeader />
        <Seperator />
        <TicketsRemaining />
        <div className='getYoursNow accentBackground'>Get Yours Now</div>
        <div className='fieldContainer'>
          <Input status={nameStatus} className='name field' onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' value={name} />
          <Input status={emailStatus} className='email field' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='buttonGroup'>
          <Button className='button' disabled={!showGetTicket} onClick={newTicket}>Get Ticket</Button>
        </div>
        <div className='raffleTicketContainer'>
          {unpaidTickets.map((ticket) => <RaffleTicket ticket={ticket} />)}
        </div>
        <div className='totalPrice'>Total: ${total}</div>
        <div className='buttonGroup'>
          <Button className='button' disabled={!showGetTicket} onClick={setBuyNow}>Pay for Tickets</Button>
        </div>
        {BuyNow && <PaymentTile />}
      </div>
    </AppContext.Provider>
  );
}

export default App;