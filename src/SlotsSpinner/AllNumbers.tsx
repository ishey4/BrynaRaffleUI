import { useEffect, useState } from "react"

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
export const AllNumbers = ({ selectedNumber, shouldSpin }: any) => {
    const [numbers, setNumbers] = useState(numberArray)

    useEffect(() => {
        const indexToSwap = numberArray.indexOf(selectedNumber)
        const newArray = [selectedNumber, ...numbers]
        newArray.splice(indexToSwap + 1, 1, 0)

        setNumbers(newArray)
    }, [selectedNumber])

    return <div className={`allNumbers ${shouldSpin ? '' : 'endIteration'}`} >
        {numbers.map((number) => <div className="numbers">{number}</div>)}
    </div>
}