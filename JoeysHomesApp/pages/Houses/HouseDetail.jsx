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
            <div key={house.property_id} className="house-tile">
                <div className="house-info">
                    <h3>{house.property_address}</h3>
                    <p>{house.property_description}</p>
                    <p><span>$</span>{house.base_value}<span>K</span></p>
                    <p>{house.purchase_date}</p>
                    <p>{house.property_id}</p>
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
