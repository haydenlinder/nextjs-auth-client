import Button from "@material-ui/core/Button"
import MyModal from "../../components/MyModal"
import PostForm from '../../components/posts/PostForm'
import { useState } from 'react'

const Index = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            {/* <div>You are logged in as {user.name} ({user.email})</div> */}
            <br/>
            <Button variant='contained' color='primary' onClick={handleOpen}>+</Button>
            <MyModal handleClose={handleClose} isOpen={isOpen}>
                <PostForm />
            </MyModal>
        </>
    )
    
}

export default Index