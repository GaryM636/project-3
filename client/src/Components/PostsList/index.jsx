import { QUERY_POSTS } from '../../utils/queries'
import { useQuery } from '@apollo/client'


function PostsList() {
    const { loading, data } = useQuery(QUERY_POSTS)
    console.log(loading, data);
    // const posts = data?.getAllPosts || []
    // console.log(posts)

    // if ( loading) {
    //     return <div>Loading...</div>
    // }

    // console.log(posts);

    return (
        <>
        <h1>Hello I am adding this because react was not liking it being blank --Clyde</h1>
        </>
    )
}

export default PostsList