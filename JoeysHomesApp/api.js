export async function getHouses(id) {
    const url = id ? `http://192.168.64.3:5000/api/houses/${id}` : "http://192.168.64.3:5000/api/houses"
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
