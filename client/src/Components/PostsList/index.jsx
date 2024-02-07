import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";

const PostList = ({ posts }) => {
    const { data } = useQuery(QUERY_POSTS);

    const post = data?.post || {};

    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
      <>
      <div>
        {posts && posts.map((post) => (
            <div key={post}>
                <div>
                    <h4>{post.text}</h4>
                    <p>{post.likes}</p>
                </div>
            </div>
        ))}
      </div>
      </>
    )
}

export default PostList;