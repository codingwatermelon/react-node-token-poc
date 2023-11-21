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