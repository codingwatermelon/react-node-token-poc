import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await
} from "react-router-dom"
//import { getHouses } from "../../api"
import { getHouses } from "../../../JoeysHomesServer/api"

export function loader() {
    return defer({ houses: getHouses() })
}

/**
 * Challenge: remove manual error handling code and any
 * React state code we no longer need, as well as set up
 * errorElement handling for the following routes:
 * - /vans
 * - /vans/:id
 * - /host/vans
 * - /host/vans/:id
 * 
 * Remember: we created an <Error /> component awhile back
 * that you should be able to reuse.
 */

export default function Houses() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get("type")

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderHouseElements(houses) {
        const displayedHouses = typeFilter
            ? houses.filter(house => house.type === typeFilter)
            : houses

        const houseElements = displayedHouses.map(house => (
            <div key={house.id} className="van-tile">
                <Link
                    to={house.id}
                    state={{
                        search: `?${searchParams.toString()}`,
                        type: typeFilter
                    }}
                >
                    <img src={house.imageUrl} />
                    <div className="van-info">
                        <h3>{house.name}</h3>
                        <p>${house.price}<span>/day</span></p>
                    </div>
                    <i className={`van-type ${house.type} selected`}>{house.type}</i>
                </Link>
            </div>
        ))
        return (
            <>
                <div className="van-list-filter-buttons">
                    <button
                        onClick={() => handleFilterChange("type", "simple")}
                        className={
                            `van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`
                        }
                    >Simple</button>
                    <button
                        onClick={() => handleFilterChange("type", "luxury")}
                        className={
                            `van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`
                        }
                    >Luxury</button>
                    <button
                        onClick={() => handleFilterChange("type", "rugged")}
                        className={
                            `van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`
                        }
                    >Rugged</button>

                    {typeFilter ? (
                        <button
                            onClick={() => handleFilterChange("type", null)}
                            className="van-type clear-filters"
                        >Clear filter</button>
                    ) : null}

                </div>
                <div className="van-list">
                    {houseElements}
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            <h1>Explore our house options</h1>
            <React.Suspense fallback={<h2>Loading houses...</h2>}>
                <Await resolve={dataPromise.houses}>
                    {renderHouseElements}
                </Await>
            </React.Suspense>
        </div>
    )
}