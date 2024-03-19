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
import { getMaintenanceByPropertiesId } from "../../services/user.service";
import { blue } from '@mui/material/colors';
import { Box } from '@mui/material';
import { format } from "date-fns"

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


export async function loader({ params, request }) {
    return defer({ maintenance: getMaintenanceByPropertiesId(params.id) })
}

export default function HouseDetailMaintenance() {
    const location = useLocation()
    const dataPromise = useLoaderData()

    function renderMaintenanceElements(maintenanceTasks) {

        // filter by search text
        let displayedMaintenanceTasks = maintenanceTasks
        
        const maintenanceElements = displayedMaintenanceTasks.map(task => (
            <div key={task.id}>
                <Link
                    to={task.id}
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

        const displayedMaintenanceElements = maintenanceElements.length > 0
        ? maintenanceElements
        : "No maintenance tasks scheduled for this property"

        return (
            <div>
                <h3>Test</h3>
                <div className="house-detail">
                    {displayedMaintenanceElements}
                </div>
    
            </div>
        )
    }

    return (
        <div className="house-list-container">
            <React.Suspense fallback={<h2>Loading maintenance...</h2>}>
                <Await resolve={dataPromise.maintenance}>
                    {renderMaintenanceElements}
                </Await>
            </React.Suspense>
        </div>
        
    )
}
