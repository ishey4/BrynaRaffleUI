import { useState } from 'react'
import { AllNumbers } from './AllNumbers'
import './SlotsSpinner.css'

export interface ISlotsSpinnerProps {
    selectedNumberArray: number[]
    shouldSpin: boolean
}

export const SlotsSpinner = ({ selectedNumberArray, shouldSpin }: ISlotsSpinnerProps) => {
    return <div className='slotsSpinner'>
        {selectedNumberArray.map((number) => <div className='numberBox'><AllNumbers selectedNumber={number} shouldSpin={shouldSpin} /></div>)}

    </div>
}