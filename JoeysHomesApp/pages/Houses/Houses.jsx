import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await
} from "react-router-dom"
import { getHouses } from "../../functions"
import { blue } from '@mui/material/colors';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { getListings } from "../../services/user.service";

const boxSX = {
    p: 2.25, 
    bgcolor: blue[50],
    boxShadow: 1,
    borderRadius: 2,
    width: {
        xs: 100, // theme.breakpoints.up('xs')
        sm: 200, // theme.breakpoints.up('sm')
        md: 300, // theme.breakpoints.up('md')
        lg: 400 // theme.breakpoints.up('lg')
    },
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
        backgroundColor: blue[200],
        transform: "scale3d(1.05, 1.05, 1)"
    }
}

export async function loader({ request }) {
    return defer({ houses: getListings("houses", "") })
}


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

        const filters = ["TBD1", "TBD2", "TBD3", "TBD4"];

        const filterButtons = filters.map(filter => (
            <div key={filter}>
                <button
                    onClick={() => handleFilterChange("type", filter)}
                    className={
                        `house-type ${filter} 
                    ${typeFilter === filter ? "selected" : ""}`
                    }
                >{filter}</button>
            </div>
        ))

        //const displayedHouses = houses
        //    ? houses
        //        .filter(house => house.property_address === typeFilter)
        //    : houses
        const displayedHouses = houses

        const houseElements = displayedHouses.map(house => (
            <div key={house.properties_id} className="house-tile">
                <Link
                    to={`${house.properties_id}`}
                    relative="path"
                >
                    <Box sx={boxSX}>
                        <h3 >{house.property_address}</h3>
                        <img src={house.image_path}/>
                    </Box>
                
                </Link>
            </div>
        ))

        return (
            <>
                <div className="house-list-filter-buttons">
                    
                    {filterButtons}

                    {typeFilter ? (
                        <button
                            onClick={() => handleFilterChange("type", null)}
                            className="house-type clear-filters"
                        >Clear filter</button>
                    ) : null}

                </div>
                <div className="house-list">
                    {houseElements}
                </div>
            </>
        )
    }

    return (
        <div className="house-list-container">
            <h1>Houses</h1>
            <React.Suspense fallback={<h2>Loading houses...</h2>}>
                <Await resolve={dataPromise.houses}>
                    {renderHouseElements}
                </Await>
            </React.Suspense>
        </div>
    )
}