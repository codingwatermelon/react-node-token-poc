import React from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
//import { getHouses } from "../../api"
import { getHouses } from "../../../JoeysHomesServer/api"

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
                <img src={house.imageUrl} />
                <i className={`van-type ${house.type} selected`}>
                    {house.type}
                </i>
                <h2>{house.name}</h2>
                <p className="van-price"><span>${house.price}K</span></p>
                <p>{house.description}</p>
            </div>

        </div>
    )
}