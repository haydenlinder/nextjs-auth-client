// TODO: break out services?
const ENDPOINT = process.env.NEXT_PUBLIC_AUTH_URL

console.log(ENDPOINT)

const gQuery = async (query, variables) => {
    const res = await fetch(
        ENDPOINT + '/graphql',
        {
            headers: {
                'Content-type': 'application/json',
            },
            method: `POST`,
            body: JSON.stringify({
                query: query,
                variables: variables
            }),
            credentials: 'include'
        }
    )
    const { data, errors } = await res.json()
    if (errors) throw errors
    return data
}

export default gQuery