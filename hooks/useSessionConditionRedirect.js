import { QueryClient } from "react-query";
import { dehydrate } from 'react-query/hydration'
import { refreshToken } from '../utils/user_auth'
import Router from 'next/router'
import queryClient from "../utils/queryClient";

const redirect = (res, location) => {
    if (res) { // server
        res.writeHead(302, {
            Location: location
        })

        res.end()
    } else { // client
        Router.push(location)
    }
    return {}
}

export const useSessionConditionRedirect = async ({ctx}) => {
    
    // these will be available on the server
    const { req, res } = ctx

    const path = req?.url || ctx.pathname
    const isProtected = (path === '/app' || path.slice(0,5) === '/app/')

    // react-router
    let client = queryClient
    let isLoggedIn = !!client.getQueryData('session')?.access_token
    if (!isLoggedIn) {
        client = new QueryClient()
        await client.prefetchQuery('session', () => refreshToken({ headers: req?.headers }))
        isLoggedIn = !!client.getQueryData('session')?.access_token
    }

    // logged out and requests '/app' or '/app/...'
    if (!isLoggedIn && isProtected) {
        return redirect(res, '/')
    }

    // logged in and requests '/signup' or '/'
    else if (isLoggedIn && !isProtected) {
        return redirect(res, '/app')
    }

    // they are in the right place
    else return {
        pageProps: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(client)))
        },
    }

}
