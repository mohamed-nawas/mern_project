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

export const updatePost = (postId, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(postId, post);
        dispatch({type: actionTypes.UPDATE, payload: data});
    } catch (e) {
        console.error(e);
    }
}

export const deletePost = (postId) => async (dispatch) => {
    try {
        await api.deletePost(postId);
        dispatch({type: actionTypes.DELETE, payload: postId})
    } catch (e) {
        console.error(e);
    }
}

export const likePost = (postId) => async (dispatch) => {
    try {
        const {data} = await api.likePost(postId);
        dispatch({type: actionTypes.LIKE_POST, payload: data});
    } catch (e) {
        console.error(e);
    }
}