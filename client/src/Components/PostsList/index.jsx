import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";

const PostsList = () => {
    const { data, loading } = useQuery(QUERY_POSTS);

    const posts = data?.getAllPosts || [];
    console.log(posts)

    if (loading) {
        return <h3>No Posts Yet</h3>;
    }

    return (
      <>
      <div>
        { posts.map((post) => (
            <div key={post._id}>
                <div>
                    <h4>{post.text}</h4>
                    <p>likes:
                        {post.likes.map((like) => {
                            <span key={like._id}>{like.username}</span>
                        })}
                        </p>
                </div>
            </div>
        ))}
      </div>
      </>
    )
}

export default PostsList;