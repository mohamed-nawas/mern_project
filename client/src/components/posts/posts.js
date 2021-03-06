import React from 'react';
import Post from "./post/post";
import useStyles from './style';
import {useSelector} from "react-redux";
import {Grid, CircularProgress} from "@material-ui/core";

const Posts = ({setCurrentPostId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    return (
        !posts.length ? <CircularProgress/> :
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={post.id} xs={12} sm={6}>
                            <Post post={post} setCurrentPostId={setCurrentPostId}/>
                        </Grid>
                    ))
                }
            </Grid>
    );
}

export default Posts;