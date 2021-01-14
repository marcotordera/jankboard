import React, { useEffect } from "react";
import { Container, ListGroup } from "reactstrap";
import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";
import PostAddModal from "./PostAddModal";
import SortDropDown from "./SortDropDown";
import Post from "./Post";
const PostList = ({ getPosts, post, authUser, isAuthenticated }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Container>
      <ListGroup>
        {isAuthenticated ? (
          <div className="floatright">
            <PostAddModal />
            <SortDropDown />
          </div>
        ) : (
          <h4 className="mb-3 ml-4">Log in to add Post and replies</h4>
        )}

        {post.posts.map(({ _id, text, comments, userName, userId }) => (
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
