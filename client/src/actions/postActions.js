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

///////////posts/////////////////////
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
export const addPost = (post) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/api/posts", post, tokenConfig(getState));
    dispatch({ type: ADD_POST, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
export const editPost = (post) => async (dispatch, getState) => {
  try {
    const res = await axios.put(
      `/api/posts/${post.id}`,
      post,
      tokenConfig(getState)
    );
    dispatch({ type: EDIT_POST, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
export const deletePost = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/posts/${id}`, tokenConfig(getState));
    dispatch({ type: DELETE_POST, payload: id });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const addComment = (post) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `/api/posts/comments/`,
      post,
      tokenConfig(getState)
    );
    dispatch({ type: ADD_COMMENT, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const editComment = (post) => async (dispatch, getState) => {
  try {
    const res = await axios.put(
      `/api/posts/comments/${post.postId}`,
      post,
      tokenConfig(getState)
    );
    dispatch({ type: EDIT_COMMENT, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
export const deleteComment = (post) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `/api/posts/comments/${post.postId}/${post.commentId}`,
      tokenConfig(getState)
    );
    dispatch({ type: DELETE_COMMENT, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
