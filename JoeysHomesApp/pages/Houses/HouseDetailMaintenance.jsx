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

        return (
            <div>
                <h3>Test</h3>
                <div className="house-detail">
                    {maintenanceElements}
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
