import { useSessionConditionRedirect } from "../../hooks/useSessionConditionRedirect"

// export const getServerSideProps = useSessionConditionRedirect(true, '/login')

const Profile = () => {

    return (
        <div>
            profile page
            {/* You are logged in as {user.name} ({user.email}) */}
        </div>
    )
}

export default Profile