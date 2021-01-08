import {
  ADD_POST,
  ADD_COMMENT,
  GET_POSTS,
  POSTS_LOADING,
  EDIT_POST,
  EDIT_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, text: action.payload.text }
            : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case ADD_COMMENT:
    case EDIT_COMMENT:
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };

    default:
      return state;
  }
};

export default postReducer;
