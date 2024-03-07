import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await
} from "react-router-dom"
import { getHouses } from "../../functions"
import { blue, green, red } from '@mui/material/colors';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { getListings } from "../../services/user.service";


// TODO Upon resizing, I can change the css for grid-template-columns such that a wider screen accomodates more columns
// I'd rather see columns shrink instead of boxes shrink (although, one/two degrees of box shrink would be ok)
const greenBoxSx = {
    p: 2.25, 
    bgcolor: green[100],
    boxShadow: 1,
    borderRadius: 2,
    width: {
        xs: 100, 
        sm: 200, 
        md: 300, 
        lg: 400
    },
    height: {
        xs: 75, 
        sm: 175, 
        md: 275, 
        lg: 375
    },
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
        backgroundColor: green[200],
        transform: "scale3d(1.05, 1.05, 1)"
    }
}

const redBoxSx = {
    p: 2.25, 
    bgcolor: red[100],
    boxShadow: 1,
    borderRadius: 2,
    width: {
        xs: 100, 
        sm: 200, 
        md: 300, 
        lg: 400
    },
    height: {
        xs: 75, 
        sm: 175, 
        md: 275, 
        lg: 375
    },
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
        backgroundColor: red[200],
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

        // TODO Create filter for green/red (button dropdown with green/red as checkbox options)
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
                    
                    {`${house.net_operating_income}` > 0 ? (
                        <Box sx={greenBoxSx}>
                            <h3 >{house.property_address}</h3>
                            <img src={house.image_path}/>
                        </Box>
                    ) :
                        <Box sx={redBoxSx}>
                            <h3 >{house.property_address}</h3>
                            <img src={house.image_path}/>
                        </Box>
                    }
                
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