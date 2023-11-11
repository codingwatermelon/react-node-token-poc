import React from "react"
import { Link, defer, Await, useLoaderData } from "react-router-dom"
//import { getHouses } from "../../../JoeysHomesServer/api"
//import { requireAuth } from "../../utils"
import { BsStarFill } from "react-icons/bs"


export default function Dashboard() {
    const income = 2260

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
        </>
    )
}
