import * as api from '../api';
import actionTypes from "./actionTypes";

// action creators
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        dispatch({type: actionTypes.FETCH_ALL, payload: data})
    } catch (e) {
        console.error(e);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        dispatch({type: actionTypes.CREATE, payload: data});
    } catch (e) {
        console.error(e);
    }
}