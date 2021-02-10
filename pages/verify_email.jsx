import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { verifyUser } from '../utils/user_auth'
import { useEffect } from 'react'

const VerifyEmail = ({  }) => {

    const router = useRouter()
    const { token } = router.query

    const verifyUserMutation = useMutation(verifyUser, {
        onSuccess: res => {
            router.push('/login')
        }
    })

    const { error, data, isLoading, isError, isSuccess } = verifyUserMutation

    useEffect(() => {
        verifyUserMutation.mutate({ token })
    },[])

    const message = error?.message || data?.message || 'Verifying...'

    return <div>{message}</div>

}

export default VerifyEmail