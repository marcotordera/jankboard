import axios from "axios";
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getPosts = () => (dispatch) => {
  axios
    .get("/api/posts")
    .then((res) => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addPost = (post) => (dispatch, getState) => {
  axios
    .post("/api/posts", post, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_POST, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const editPost = (post) => (dispatch, getState) => {
  axios
    .put(`/api/posts/${post.id}`, post, tokenConfig(getState))
    .then((res) => dispatch({ type: EDIT_POST, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deletePost = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then((res) => dispatch({ type: DELETE_POST, payload: id }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

////////////////////////////////// comments/////////////////////////////
export const addComment = (post) => (dispatch, getState) => {
  axios
    .post(`/api/posts/comments/`, post, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_COMMENT, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editComment = (post) => (dispatch, getState) => {
  axios
    .put(`/api/posts/comments/${post.postId}`, post, tokenConfig(getState))
    .then((res) => dispatch({ type: EDIT_COMMENT, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteComment = (post) => (dispatch, getState) => {
  axios
    .delete(
      `/api/posts/comments/${post.postId}/${post.commentId}`,
      tokenConfig(getState)
    )
    .then((res) => dispatch({ type: DELETE_COMMENT, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
