import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react'
import gQuery from '../../utils/gQuery'
// import { getState } from '../../utils/state'

const PostForm = ({ handleClose = () => null }) => {

    const [body, setBody] = useState('')
    // const { id } = getState().current_user

    const handleSubmit = async e => {
        e.preventDefault()
        // try {
        //     const { insert_posts_one } = await gQuery(
        //         CREATE_POST_MUTATION, 
        //         { author_id: id, body }
        //     )
            
        //     getState().posts[insert_posts_one.id] = insert_posts_one
        //     handleClose()
        // } catch(error) {
        //     console.error({error})
        // }
    }

    const handleChange = e => {
        setBody(e.target.value)
    }

    const CREATE_POST_MUTATION = `
        mutation (
            $author_id: bigint = "", 
            $body: String = ""
        ) { 
            insert_posts_one (
                object: {
                    author_id: $author_id, 
                    body: $body
                }
            ) {
                author_id
                body
                created_at
                id
                updated_at
            }
        }
    `

    return (  
        <form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
            <Typography color="textSecondary" gutterBottom>
                New Post
            </Typography>
            <Typography variant="h5" component="h2">
                {body.slice(0,18)} ...
            </Typography>
            <br />
            <TextField
                rowsMax={16}
                aria-label="empty textarea"
                variant='outlined'
                placeholder="What do you want to say"
                onChange={handleChange}
                multiline
                required
                fullWidth
            />
            <br />
            <Box display='flex' justifyContent='flex-end'>
                <CardActions>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        type='submit'
                    >Post</Button>
                </CardActions>
            </Box>
        </form>   
    )
}

export default PostForm