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
import { styled, useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
// mui colors https://mui.com/material-ui/customization/color/
import { blue } from '@mui/material/colors';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from "react";
// search https://github.com/Saleh-Mubashar/React-Search/blob/master/App.js
import TextField from "@mui/material/TextField";
import List from "./List";

// sx prop doc https://mui.com/system/getting-started/the-sx-prop/
// box doc https://mui.com/material-ui/react-box/
// mui template inspiration https://mui.com/store/previews/berry-react-material-admin-free/
const boxSX = {
    p: 2.25, 
    bgcolor: blue[50],
    boxShadow: 1,
    borderRadius: 2,
    width: {
        xs: 700, // theme.breakpoints.up('xs')
        sm: 800, // theme.breakpoints.up('sm')
        md: 900, // theme.breakpoints.up('md')
        lg: 1200, // theme.breakpoints.up('lg')
        xl: 1400, // theme.breakpoints.up('xl')
    },
    // zoom transition on hover https://stackoverflow.com/questions/64080401/how-to-enlarge-card-size-on-hovering-over-it-in-material-ui
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
        backgroundColor: blue[200],
        transform: "scale3d(1.05, 1.05, 1)"
    }
}

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

    function renderMaintenanceElements(props) {
        const displayedMaintenanceTasks = props.input 
            ? props.maintenance.filter(task => task.maintenance_name.startsWith(props.input))
            : props.maintenance

        const maintenanceElements = displayedMaintenanceTasks.map(task => (
            <div key={task.id}>
                <Link
                    to={task.id}
                    state={{
                        search: `?${searchParams.toString()}`,
                        type: typeFilter
                    }}
                >
                    <Box sx={boxSX}>
                        <div>
                            <h2>{format(new Date(task.due_date_epoch * 1000), "MMMM do, yyyy")}</h2>
                            <h3>{task.maintenance_name}</h3>
                            <h3>{task.maintenance_type}</h3>
                            <p><span>$</span>{task.cost}</p>
                        </div>
                    </Box>
                
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

    // TODO Conditionally render certain tasks when search bar is being used
    // By default, show all tasks until search bar is being used

    // Function to call renderMaintenanceElements
    function renderList(maintenance) {
        const [inputText, setInputText] = useState("");
        let inputHandler = (e) => {
            //convert input text to lower case
            var lowerCase = e.target.value.toLowerCase();
            setInputText(lowerCase);
        };

        <div className="main">
            <h1>React Search</h1>
                <div className="search">
                    <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                    />
                </div>

            <renderMaintenanceElements 
                input={inputText} 
                tasks={maintenance}
            />
        </div>


    
    }


    return (
        <div className="maintenance-list-container">
            <h1>Maintenance page</h1>
            <React.Suspense fallback={<h2>Loading maintenance tasks...</h2>}>
                <Await resolve={dataPromise.maintenance}>
                    {renderList}
                </Await>
            </React.Suspense>
        </div>
    )
}