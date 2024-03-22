import React from "react"
import {
    useOutletContext,
    Await
} from "react-router-dom"

export default function HouseDetailInfo() {
    const { dataPromise } = useOutletContext()

    function renderHouseElements(house) {

        function currencyFormat(num) {
            let dollar = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            return dollar.format(num);
        }

        const displayedHouses = house

        const houseElements = displayedHouses.map(house => (
            <div key={house.properties_id}>
                <div className="house-info">
                    <p>Purchased on {new Date(house.purchase_date).toDateString()} for {currencyFormat(house.purchase_price)}</p>
                    <p>Vacancy Rate: {house.vacancy_rate}%</p>
                    <p>Rental Income: {currencyFormat(house.rental_income)}</p>
                    <p>Operating Expenses: {currencyFormat(house.operating_expenses)}</p>
                    <p>Operating Expense Ratio: {house.operating_expense_ratio}</p>
                </div>
            </div>
        ))
    
        return (
            <div className="house-detail-container">
                {houseElements}
            </div>
        )
    }

    return (
        <div className="house-list-container">
            <React.Suspense fallback={<h2>Loading house...</h2>}>
                <Await resolve={dataPromise.house}>
                    {renderHouseElements}
                </Await>
            </React.Suspense>
        </div>
        
    )
}
