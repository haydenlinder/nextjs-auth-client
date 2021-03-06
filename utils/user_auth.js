
import Router from "next/router"
import { useMutation, useQuery } from "react-query"
import queryClient from "./queryClient"

// auth service
const NEXT_PUBLIC_CLIENT_SERVICE_URL = process.env.NEXT_PUBLIC_CLIENT_SERVICE_URL
const NEXT_PUBLIC_SERVER_SERVICE_URL = process.env.NEXT_PUBLIC_SERVER_SERVICE_URL
// endpoints
const SIGNUP = '/signup'
const LOGIN = '/login'
const LOGOUT = '/logout'
const REFRESH = '/refresh_token'
const VERIFY = '/verify_email'

const userAction = async (user, endpoint, opts = {headers: {}}) => {

    const resource = 
    typeof window !== 'undefined' ? 
        NEXT_PUBLIC_CLIENT_SERVICE_URL :
        NEXT_PUBLIC_SERVER_SERVICE_URL 

    const res = await fetch( 
        resource + endpoint,
        {
            headers: {
                'Content-type': 'application/json',
                ...opts.headers
            },
            method: `POST`,
            body: JSON.stringify(user),
            credentials: 'include'
        }
    )
    const { data, errors } = await res.json()
    if (errors) throw errors
    return data
} 

export const createUser = async (user) => {
    return await userAction(user, SIGNUP)
}

export const verifyUser = async (user = { token: '' }) => {
    return await userAction(user, VERIFY)
}

export const loginUser = async (user) => {
    return await userAction(user, LOGIN)
}

export const logout = async () => {
    return await userAction({}, LOGOUT)
}

export const refreshToken = async (opts = { headers: {}}) => {
    return await userAction({}, REFRESH, opts)
}

export const useLoginUserMutation = () => {
    return {}
}

export const useRefreshTokenQuery = () => {
    return useQuery('session', refreshToken, { retry: false })
}

export const useLogoutMutation = () => {
    return useMutation(logout, {
        onSuccess: data => {
            queryClient.setQueryData('session', {})
            Router.push('/')
        }
    })
}