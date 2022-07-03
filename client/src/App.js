import React from 'react';
import {AppBar, Container, Grid, Grow, Typography} from "@material-ui/core";
import memories from './images/memories.png';
import Posts from "./components/posts/posts";
import Form from "./components/form/form";
import useStyles from './styles';
import {useDispatch} from "react-redux";
import {getPosts} from './actions/posts';

function App() {
    const [currentPostId, setCurrentPostId] = React.useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getPosts());
    }, [currentPostId, dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentPostId={setCurrentPostId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;
