const CheckUserAuth = async (id: string) => {

    const response = await fetch(`https://arzaq.kinde.com/oauth2/token`, {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            audience: "https://arzaq.kinde.com/api",
            grant_type: "client_credentials",
            client_id: "3bb595f9b16843138c68cc482f179152",
            client_secret: "IEI95WBUbFmmn8yOpho6Oethkack2JLKIom2Uj3EgisgVITv9Eu",
        }),
    });
    const token = await response.json();

    const users = await fetch(`https://arzaq.kinde.com/api/v1/user?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        }
    })
    const userResponse = await users.json()

    return userResponse

}

export default CheckUserAuth