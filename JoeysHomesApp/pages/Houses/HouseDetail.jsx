import React from "react"
import {
    Link,
    NavLink,
    useLoaderData,
    defer,
    Await,
    useLocation,
    Outlet
} from "react-router-dom"
import { getListings, getMaintenanceByPropertiesId } from "../../services/user.service";

export async function loader({ params, request }) {
    return defer({ house: getListings("houses", params.id) })
}

export default function HouseDetail() {
    const location = useLocation()
    const dataPromise = useLoaderData()

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
                    <h3>{house.property_address}</h3>
                    {house.property_description ? (
                        <p>{house.property_description}</p>
                    ) : null}
                    <p>Cash Flow: {currencyFormat(house.cash_flow)}</p>
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

                <nav>
                    <NavLink
                        to="."
                        end
                    >
                        Details
                    </NavLink>  
                    <NavLink
                        to="maintenance"
                    >
                        Maintenance
                    </NavLink>
                </nav>
                <Outlet context={{ dataPromise }}/>
    
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
