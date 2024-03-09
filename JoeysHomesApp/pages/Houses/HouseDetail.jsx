import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await,
    useLocation,
    useParams
} from "react-router-dom"
import { getListings } from "../../services/user.service";

export async function loader({ params, request }) {
    return defer({ house: getListings("houses", params.id) })
}

export default function HouseDetail() {
    const location = useLocation()
    const dataPromise = useLoaderData()

    function renderHouseElements(house) {

        const displayedHouses = house

        const houseElements = displayedHouses.map(house => (
            <div key={house.properties_id}>
                <div className="house-info">
                    <h3>{house.property_address}</h3>
                    <p>Description: {house.property_description}</p>
                    <p>Purchase Date: {house.purchase_date}</p>
                    <p>Purchase Price: ${house.purchase_price}</p>
                    <p>Vacany Rate: ${house.vacancy_rate}</p>
                    <p>Rental Income: ${house.rental_income}</p>
                    <p>Operating Expenses: ${house.operating_expenses}</p>
                    <p>Cash Flow: ${house.cash_flow}</p>
                    <p>Operating Expense Ratio: ${house.operating_expense_ratio}</p>
                    <img src={house.image_path}/>
                </div>
            </div>
        ))
        const search = location.state?.search || "";
        const type = location.state?.type || "all";
    
        return (
            <div className="house-detail-container">
                <Link
                    to={`..${search}`}
                    relative="path"
                    className="back-button"
                >&larr; <span>Back to {type} houses</span></Link>
    
                <div className="house-detail">
                    {houseElements}
                </div>
    
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
