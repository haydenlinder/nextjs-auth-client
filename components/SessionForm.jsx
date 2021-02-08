import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { createUser, loginUser } from '../utils/user_auth'
import { Formik, Field, Form } from 'formik'
import Link from 'next/link'
import TextField from '@material-ui/core/TextField'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import queryClient from '../utils/queryClient'

const SessionForm = ({ isLogin = true, callback = () => null }) => {

    const router = useRouter()

    const signupMutation = useMutation(createUser, {
        onSuccess: res => {
            console.log(res)
            callback()
        }
    })

    const loginMutation = useMutation(loginUser, {
        onSuccess: res => {
            queryClient.setQueryData('session', res)
            router.push('/app')
        }
    })

    const isLoading = loginMutation.isLoading || signupMutation.isLoading

    const handleDemo = e => {
        e.preventDefault()
        const user = { email: 'email@email.com', password: '1234' }
        loginMutation.mutate(user)
    }

    const validate = values => {
        const errors = {}
        if (!values.email) {
            errors.email = 'Required'
        }
        return errors
    }

    const onSubmit = async (values) => {
        isLogin ? loginMutation.mutate(values) : signupMutation.mutate(values)
    }

    const sharedButtonProps = {
        color: 'primary',
        fullWidth: true
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={validate}
            onSubmit={onSubmit}
        >
            {({
                values,
                errors,
                handleChange,
                isSubmitting,
                /* and other goodies */
            }) => (
                <Form >
                    <Box display='flex' alignItems='center' flexDirection='column'>
                        <h1 className='text-xl text-center'>{isLogin ? 'Log In' : 'Sign Up'}</h1>
                        <br />
                        <Field
                            className='-my-2'
                            type="email"
                            name="email"
                            label='email'
                            required
                            onChange={handleChange}
                            value={values.email}
                            variant='outlined'
                            as={TextField}
                        />
                        <br />
                        <Field
                            type="password"
                            name="password"
                            label="password"
                            required
                            onChange={handleChange}
                            value={values.password}
                            variant='outlined'
                            as={TextField}
                        />
                        <br />
                        <Button type="submit" disabled={isLoading} variant='contained' {...sharedButtonProps}>
                            {isSubmitting?'Submitting...':'Submit'}
                        </Button>
                        <br />
                        <Link href={isLogin?'/signup':'/login'}>
                            <Button disabled={isLoading} variant='outlined' {...sharedButtonProps}>
                                {isLogin ? 'Create Account' : 'Log In'}
                            </Button>
                        </Link>
                        <br />
                        <Button disabled={isLoading} onClick={handleDemo} variant='outlined' {...sharedButtonProps}>
                            Demo
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default SessionForm