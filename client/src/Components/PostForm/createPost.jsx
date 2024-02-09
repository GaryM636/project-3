import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutations';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BottomNav from '../PostBottomNav/index.jsx';
import '../PostForm/createPost.css';


const PostForm = ({ userId }) => {
    const [post, setPost] = useState('');

    const [addPost, { error }] = useMutation(CREATE_POST);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addPost({
                variables: { userId, post }
            });

            setPost('');
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>

            <h4 id="pagetitle">Create A Post</h4>
            <form id="newPost" onSubmit={handleFormSubmit}>
                <Card id="postCard" classname='cards'>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <p>Create post: </p> 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <input placeholder='Enter new post'/>
                        </Typography>
                    </CardContent>
                </Card>
            </form>




            {/* <form onSubmit={handleFormSubmit}>
                <div>
                    <input
                        placeholder='Enter your post'
                        value={post}
                        onChange={(event) => setPost(event.target.value)}
                    />
                </div>

                <div>
                    <button type='submit'>Create Post</button>
                </div>
                {error && (
                    <div> Something went wrong...</div>
                )}
            </form> */}
        </>
    )
};

export default PostForm;