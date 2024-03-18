import React from "react"
import {
    useOutletContext
} from "react-router-dom"

export default function HouseDetailInfo() {
    const { currentHouse } = useOutletContext()

    function currencyFormat(num) {
        let dollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return dollar.format(num);
    }

    return (
        <div>
            <h3>Test</h3>
            
        </div>
    )
}
