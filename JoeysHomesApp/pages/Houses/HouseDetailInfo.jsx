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
            <div className="house-detail">
                <p>Purchased on {new Date(currentHouse.purchase_date).toDateString()} for {currencyFormat(currentHouse.purchase_price)}</p>
                <p>Vacancy Rate: {currentHouse.vacancy_rate}%</p>
                <p>Rental Income: {currencyFormat(currentHouse.rental_income)}</p>
                <p>Operating Expenses: {currencyFormat(currentHouse.operating_expenses)}</p>
                <p>Operating Expense Ratio: {currentHouse.operating_expense_ratio}</p>
            </div>

        </div>
    )
}
