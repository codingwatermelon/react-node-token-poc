export async function getHouses(id) {
    const url = id ? `/api/houses/${id}` : "/api/houses"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch houses",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    console.log(data)
    return data
}
