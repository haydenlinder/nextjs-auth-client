import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Modal from '@material-ui/core/Modal'
import React from 'react'

const MyModal = ({ isOpen, handleClose, children }) => {
    return (
        <Modal
            style={{
                position: 'absolute', margin: 'auto',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}
            onClose={handleClose}
            open={isOpen}
        >  
            <Card raised style={{ outline: 0, maxHeight: '90%', overflow: 'scroll', padding: 20 }} >
                <CardContent>
                    {React.cloneElement(children, {handleClose})}
                </CardContent>
            </Card >
        </Modal>
    )
}

export default MyModal