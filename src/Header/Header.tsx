import banner from '../Images/Brynas-Legacy-Main-Banner-1366-x-360-px.png'

import './Header.css'

export const Header = () => {
    return <>
        <img src={banner}></img>
        <h1>Win 2 Tickets To Israel ($2,000 Value)</h1>
        < h2 className='accentBackground' > DRAWING WILL BE: Feburary 11, 2023 </h2>
        < div className='moreDetails' > Bryna's Legacy MMY Scholarship und provides earmarked need - based scholarships over and above MMY’s generous financial aid, for young women who yearn to study Torah in Israel at MMY.In this way, we hope to perpetuate Bryna's legacy for “miles to go” and to spread her special light to other growth-oriented Jewish young women who strive to follow in her giant footsteps.</div>
    </>
}