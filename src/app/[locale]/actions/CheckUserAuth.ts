const CheckUserAuth = async (id: string) => {

    const response = await fetch(`https://gshop.kinde.com/oauth2/token`, {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            audience: "https://gshop.kinde.com/api",
            grant_type: "client_credentials",
            client_id: "e6115a52df3345d99e0c993f46974a1b",
            client_secret: "BGOFIXHREJxcCRxDVeaxKExJJQ2f82j0FT1NMLsJ6dCWm5X6mna6",
        }),
    });
    const token = await response.json();

    const users = await fetch(`https://gshop.kinde.com/api/v1/user?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        }
    })
    const userResponse = await users.json()

    return userResponse

}

export default CheckUserAuth