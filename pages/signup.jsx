import SessionForm from '../components/SessionForm'
import { useState } from 'react'

const Signup = ({ }) => {
    
    const [needsVerification, setNeedsVerification] = useState(false)

    return needsVerification?
    
    <div>Please verify</div>
    : 
    <SessionForm isLogin={false} callback={() => setNeedsVerification(true)} />
    
}

export default Signup