import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await
} from "react-router-dom"
import { getMaintenance } from "../../api"
import { format } from "date-fns"
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';


export function loader() {
    return defer({ maintenance: getMaintenance() })
}

export default function Maintenance() {
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

    function renderMaintenanceElements(maintenanceTasks) {
        const displayedMaintenanceTasks = maintenanceTasks

        const maintenanceElements = displayedMaintenanceTasks.map(task => (
            <div key={task.id} className="maintenance-tile">
                <Link
                    to={task.id}
                    state={{
                        search: `?${searchParams.toString()}`,
                        type: typeFilter
                    }}
                >
                    
                    <div className="maintenance-info">
                        <Box>
                        <h2>{format(new Date(task.due_date_epoch * 1000), "MMMM do, yyyy")}</h2>
                        <h3>{task.maintenance_name}</h3>
                        <h3>{task.maintenance_type}</h3>
                        <p><span>$</span>{task.cost}</p>
                        </Box>
                    </div>
                    
                
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
                <div className="maintenance-list">
                    {maintenanceElements}
                </div>
            </>
        )
    }

    return (
        <div className="maintenance-list-container">
            <h1>Maintenance page</h1>
            <React.Suspense fallback={<h2>Loading maintenance tasks...</h2>}>
                <Await resolve={dataPromise.maintenance}>
                    {renderMaintenanceElements}
                </Await>
            </React.Suspense>
        </div>
    )
}