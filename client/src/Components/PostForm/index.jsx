import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutations';


const PostForm = ({userId}) => {
const [post, setPost] = useState('');

const [addPost, {error}] =  useMutation(CREATE_POST);

const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        const {data} = await addPost({
            variables: { userId, post}
        });

        setPost('');
    } catch (err) {
        console.log(err)
    }
};

    return (
        <>
        <h4>Create A Post</h4>
        <form onSubmit={handleFormSubmit}>
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
        </form>
        </>
    )
};

export default PostForm;