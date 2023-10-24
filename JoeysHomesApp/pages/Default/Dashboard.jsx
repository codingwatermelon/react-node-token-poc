import React from "react"
import { Link, defer, Await, useLoaderData } from "react-router-dom"
import { getHouses } from "../../api"
//import { getHouses } from "../../../JoeysHomesServer/api"
import { requireAuth } from "../../utils"
import { BsStarFill } from "react-icons/bs"

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ houses: getHouses() })
}

export default function Dashboard() {
    const loaderData = useLoaderData()
    const income = 2260

    function renderHouseElements(houses) {
        const housesEls = houses.map((house) => (
            <div className="host-van-single" key={house.id}>
                <Link
                    to={`houses/${house.id}`}
                >
                <img src={house.imageUrl} alt={`Photo of ${house.name}`} className="host-van-single-img"/>
                
                <div className="host-van-info">
                    <h3>{house.name}</h3>
                    <p>${house.price}K</p>
                </div>
                </Link>
                
            </div>
        ))

        return (
            <div className="host-vans-list">
                <section>{housesEls}</section>
            </div>
        )
    }

    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                <Link to="income">
                    <h1>General Summary</h1>
                </Link>
                    <p>Net Income last <span>30 days</span></p>
                    <div className={`${income > 0 ? "income-summary-green" : "income-summary-red"}`}>
                        <h2>${income}</h2>
                    </div>
                </div>
            </section>
            <section className="host-vans-list">
                <div className="top">
                    <h2>Your listed houses</h2>
                    <Link to="houses">View all</Link>
                </div>
                <React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={loaderData.houses}>{renderHouseElements}</Await>
                </React.Suspense>
            </section>
        </>
    )
}
