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
    console.log("creds (loginUser client)")
    console.log(creds)
    const res = await fetch("http://192.168.64.3:5000/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    console.log("res (loginUser client)")
    console.log(res.body.getReader())

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    //fetch("./tortoise.png")
    //// Retrieve its body as ReadableStream
    //.then((response) => response.body)
    //.then((body) => {
    //  const reader = body.getReader();
    //  // …
    //});

    const data = await res.json()
    console.log("data (loginUser client)")
    console.log(data)

    return data
}