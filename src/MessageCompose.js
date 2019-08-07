import React, {createRef} from 'react';
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {withStyles} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";


const styles = () => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 64,
        padding: 10,
        paddingBottom: 3,
        display: 'flex',
        alignItems: 'flex-end',
    },
    form: {
        display: 'flex',
        flexGrow: 1,
    },
    sendButton: {
        marginLeft: 10,
    }
});

class MessageCompose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messageSent: false,
        }
    }

    ref = createRef();

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.messageSent) {
            this.setState({messageSent: false});
            this.ref.current.focus();
        }
    }

    render() {
        const {message} = this.state;
        const {classes, sendMessage} = this.props;

        return (
            <Paper className={classes.root} square>
                <form className={classes.form} onSubmit={e => {
                    e.preventDefault();
                    if (message) {
                        sendMessage(message);
                        this.setState({message: '', messageSent: true});
                    }
                }}>
                    <Grid container spacing={0} alignItems='flex-end'>
                        <Grid item xs>
                            <TextField
                                multiline
                                rowsMax={2}
                                value={message}
                                onChange={e => this.setState({message: e.target.value})}
                                fullWidth
                                autoFocus
                                inputRef={this.ref}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" type='submit'><SendIcon/></IconButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(MessageCompose);