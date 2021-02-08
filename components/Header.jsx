import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { useRefreshTokenQuery, useLogoutMutation } from '../utils/user_auth'

const Header = ({  }) => {
    const logout = useLogoutMutation()
    const session = useRefreshTokenQuery()

    let user
    if (session?.data?.access_token) {
        user = true
    }

    const handleLogout = e => {
        logout.mutate()
    }

    return (
        <AppBar position="fixed">
            <Container>
                <Box mx={2} display='flex' alignItems='center' justifyContent='space-between'>
                    <Box display='flex' alignItems='center'>
                        <IconButton edge="start"  color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Link href='/' passHref>
                            <Button color='inherit'>
                                <h2 className='normal-case'>My App</h2>
                            </Button>
                        </Link>
                    </Box>
                    {user ? 
                    <Box>
                        <Link href='/app/profile' passHref>
                            <Button color="inherit" >Profile</Button>
                        </Link>
                        <Button color="inherit" onClick={handleLogout} disabled={logout.isLoading}>Logout</Button>
                    </Box>
                    :
                    <Link href='/login' passHref>
                        <Button color="inherit" >Log in</Button>
                    </Link>
                    }
                </Box>
            </Container>
        </AppBar>
    )
}

export default Header