import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {axios} from './utils';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        paddingTop: 15,
        paddingBottom: 15,
    },
});
export default props => {
    const [username, setUsername] = useState('');
    const [userNameTaken, setUserNameTaken] = useState(false);
    const classes = useStyles();
    return (
        <Dialog
            open={true}
            maxWidth="xs"
        >
            <DialogContent className={classes.root}>
                <form onSubmit={e => {
                    e.preventDefault();
                    if(username=== '')
                        return;
                    axios.post('/login', {username})
                        .then(({data}) => {
                            localStorage.setItem('jwt', data);
                            props.login(username);
                        })
                        .catch(err => {
                            if (err.response.status === 400)
                                setUserNameTaken(true);
                        })
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Welcome to Cool Chat! </Typography>
                            <Typography variant='h6'>Please choose a username:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={username}
                                label='Username'
                                onChange={e => {
                                    setUsername(e.target.value);
                                    setUserNameTaken(false);
                                }}
                                autoFocus
                                fullWidth
                                error={userNameTaken}
                                helperText={userNameTaken ? 'Username taken, try something else.' : null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Join
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
}