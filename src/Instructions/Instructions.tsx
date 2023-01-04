import prepay from '../Images/Prepay.png'
import takeAChance from '../Images/TakeAChance.png'
import win from '../Images/Win.png'

import './Instructions.css'

export const Instructions = () => {
    return <div className='instructionTileContainer'>
        <div className="instructionTile">
            <img src={prepay} />
            <h3>1. Prepay</h3>
            <div>Payment will be charged to your credit card - anywhere from $1.00 - $250.00</div>
        </div>
        <div className="instructionTile">
            <img src={takeAChance} />
            <h3>2. TAKE A CHANCE!</h3>
            <div>You will get a random number between 1-250. This is your ticket price.</div>
        </div>
        <div className="instructionTile">
            <img src={win} />
            <h3>2. WIN!</h3>
            <div>Now you havea chance to win $10,000 while helping girls learn in Israel!</div>
        </div>
    </div>
}
