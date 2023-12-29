export async function getHouses(id) {
    const url = id ? `http://192.168.64.3:5000/api/houses/${id}` : "http://192.168.64.3:5000/api/houses"
    console.log(url)
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch houses",
            statusText: res.statusText,
            status: res.status,
        }
    }
    
    const data = await res.json()
    return data
}

export async function getMaintenance(id) {
    const url = id ? `http://192.168.64.3:5000/api/maintenance/${id}` : "http://192.168.64.3:5000/api/maintenance"
    console.log(url)
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch maintenance tasks",
            statusText: res.statusText,
            status: res.status,
        }
    }
    
    const data = await res.json()
    return data
}

export async function loginUser(creds) {

    const res = await fetch("http://192.168.64.3:5000/api/login",
        {   method: "post", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds) }
    )

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()

    // Check if data is one row and only one row, otherwise error
    console.log("data")
    console.log(data)
    if (!data) {
        throw {
            message: 'User not found',
            statusText: 'User not found',
            status: '404'
        }
    }

    return data
}