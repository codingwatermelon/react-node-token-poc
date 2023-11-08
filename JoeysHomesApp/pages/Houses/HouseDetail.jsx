import React from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
//import { getHouses } from "../../api"
import { getHouses } from "../../api"

export function loader({ params }) {
    return getHouses(params.id)
}

export default function HouseDetail() {
    const location = useLocation()
    const house = useLoaderData()

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} houses</span></Link>

            <div className="van-detail">
                <h3>{house.property_address}</h3>
                <p>{house.property_description}</p>
                <p><span>$</span>{house.base_value}<span>K</span></p>
                <p>{house.purchase_date}</p>
                <p>{house.property_id}</p>
                <img src={house.image_path}/>
            </div>

        </div>
    )
}

//<i className={`van-type ${house.type} selected`}>
//    {house.type}
//</i>