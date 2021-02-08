import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { verifyUser } from '../utils/user_auth'

const VerifyEmail = ({  }) => {

    const router = useRouter()
    const { token } = router.query

    const verifyUserMutation = useMutation(verifyUser, {
        onSuccess: res => {
            console.log(res)
        }
    })

    useEffect(() => {
        verifyUserMutation.mutate(token)
    },[])

    return (
        <div>Verifying token: {token}...</div>
    )

}

export default VerifyEmail