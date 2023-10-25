export async function getHouses(id) {
    const url = id ? `http://192.168.64.3:5000/api/houses/${id}` : "http://192.168.64.3:5000/api/houses"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch houses",
            statusText: res.statusText,
            status: res.status,
            // TODO need to see what is in the res object... need to figure out how to access it
            test: res

        }
    }
    const data = await res.json()
    return data
}
