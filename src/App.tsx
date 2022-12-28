import { Context, useEffect, useState } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import Card from 'antd/es/card';

import { PaymentTile } from './PaymentTile/PaymentTile';
import { useUserData } from './Hooks/useUserData';
import { AppContext, IAppContext } from './AppContext';
import { NewTicketComponent } from './NewTicket/NewTicket';
import { PaymentIntent } from '@stripe/stripe-js';
import { useGetTicket } from './API/getTicket';
import { useTickets } from './Hooks/useTickets';

import banner from './Images/Brynas-Legacy-Main-Banner-1366-x-360-px.png'

// import 'antd/dist/reset.css';
import './App.css';
import { RaffleTicket } from './RaffleTicket/RaffleTicket';
import { TTicket } from './API/types';

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

  const unpaidTickets = tickets.filter(({ transactionId }) => !transactionId)
  const paidTickets = tickets.filter(({ transactionId }) => transactionId)

  const newTicket = () => {
    getTicket().then(addTicket)
  }

  const nameStatus = !name ? "error" : ''
  const emailStatus = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? '' : 'error'

  const showGetTicket = !nameStatus && !emailStatus

  const purchasedTicketsByInvoice = paidTickets.reduce((acc, ticket) => {
    const currentGroup = acc[ticket?.transactionId || ''] || [];
    const newInvoiceGroup = [...currentGroup, ticket]
    return { ...acc, [ticket.transactionId]: newInvoiceGroup }
  }, {} as { [key: string]: TTicket[] })


  return (
    <AppContext.Provider value={contextValue}>
      <div className='App'>
        <img src={banner}></img>
        <h1><strong>Win a Trip! Only 250 Tickets Left, Get yours now!</strong></h1>
        <div className='fieldContainer spaceBetween'>
          <div className='fieldContainer'>
            <Input status={nameStatus} addonBefore="Name" className='name field' onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' value={name} />
            <Input status={emailStatus} addonBefore="Email" className='email field' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className='fieldContainer'>
            <Button disabled={!showGetTicket} onClick={newTicket}>Get Ticket</Button>
            <Button disabled={!showGetTicket} onClick={setBuyNow}>Buy Tickets (${total})</Button>
          </div>
        </div>
        {BuyNow && <PaymentTile />}
        <div className='allTickets'>
          {unpaidTickets.map((ticket) => <RaffleTicket ticket={ticket} />)}
        </div>


        <div>
          <h2>Purchased Tickets</h2>
          {Object.entries(purchasedTicketsByInvoice).map(([key, value]) => {
            return <>
              <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "baseline" }}>
                <a target={'_blank'} href={value[0].receipt_url}>Invoice</a>
                <div className='allTickets' style={{ maxWidth: '50%' }}>
                  {value.map((ticket) => <RaffleTicket ticket={ticket} />)}
                </div>
              </div>
            </>
          })}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
function useContext(AppContext: Context<IAppContext>): { getTicket: any; addTicket: any; } {
  throw new Error('Function not implemented.');
}

