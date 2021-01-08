import React, { useEffect } from "react";
import { Container, ListGroup } from "reactstrap";
import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";
import PostAddModal from "./PostAddModal";
import Post from "./Post";
const PostList = ({ getPosts, post, authUser }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const { posts } = post;
  return (
    <Container>
      <ListGroup>
        <PostAddModal />
        {posts.map(({ _id, text, comments, userName, userId }) => (
          <Post
            postId={_id}
            text={text}
            comments={comments}
            userName={userName}
            key={_id}
            userId={userId}
            currentUserId={authUser._id}
          />
        ))}
      </ListGroup>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, { getPosts })(PostList);
