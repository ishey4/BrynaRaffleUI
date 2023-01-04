import raffleTickets from '../Images/RaffleTickets.png'
import { Instructions } from '../Instructions/Instructions'
import './SubHeader.css'

export const SubHeader = () => {
    return <div className="subHeader">
        <div className="title">
            <div className="header">How does it work?</div>
            <div className='displayFlex'>
                <img src={raffleTickets} />
                <h3 className='blackText'>Buy a ticket - you will be charged anywherefrom  $1 to $250 with the chance to win <strong>$10,00!!</strong></h3>
            </div>
        </div>
        <Instructions/>
    </div>
}