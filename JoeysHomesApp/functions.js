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

// TODO Modify to use new routes
export async function loginUser(creds) {

    console.log("test")
    console.log(JSON.stringify(creds))

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
    
    console.log("data")
    console.log(data)

    // Check if data is one row and only one row, otherwise error
    if (data.length == 0) {
        throw {
            message: `User '${creds.email}' not found`,
            statusText: `User '${creds.email}' not found`,
            status: '404'
        }
    }
    else if (data.length > 1) {
        throw {
            message: `Internal server error, check DB`,
            statusText: `Internal server error, check DB`,
            status: '500'
        }
    }

    return data
}

export async function signupUser(creds) {

    // Note: Need to JSON.stringify() this, otherwise will get a CORS error (which actually isn't a CORS error) but somehow is detected as one in the browser
    // This makes the object readable, otherwise it will show as '[object Object]' in the req for some reason
    const signupUserBody = {
        "username": creds.email,
        "email": creds.email,
        "password": creds.password,
        "roles": ["user"]
    }

    const res = await fetch("http://192.168.64.3:5000/api/auth/signup",
        {   method: "post", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupUserBody)
        }
    )

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()
    
    console.log("data")
    console.log(data)

    // Check if data is one row and only one row, otherwise error
    //if (data.length == 0) {
    //    throw {
    //        message: `User '${creds.email}' not found`,
    //        statusText: `User '${creds.email}' not found`,
    //        status: '404'
    //    }
    //}
    //else if (data.length > 1) {
    //    throw {
    //        message: `Internal server error, check DB`,
    //        statusText: `Internal server error, check DB`,
    //        status: '500'
    //    }
    //}

    return data
}