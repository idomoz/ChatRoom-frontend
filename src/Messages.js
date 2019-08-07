import React from 'react';
import {makeStyles, createStyles, lighten} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => createStyles({
    root: {
        marginTop: 80,
        marginBottom: 80,
        display: 'flex',
        flexDirection: 'column',
    },
    message: {
        width: 'fit-content',
        maxWidth: '90%',
        padding: 10,
        margin: 10,
    },
    sender: {
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        display: 'block',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
    selfMessage: {
        alignSelf: 'flex-end',
        background: lighten(theme.palette.primary.light, 0.9),
    },
    date: {
        display: 'block'
    },
    selfMessageDate: {
        float: 'right',
    },
    avatar: {
        marginRight: 5,
        width: 30,
        height: 30,
    },
    newUserMessage: {
        alignSelf: 'center',
        display: 'block',
        width: 'fit-content',
        background: lighten(theme.palette.primary.light, 0.7),
        margin: 10,
        padding: 3,
    },
    joinedText: {
        fontWeight: 400
    }
}));
export default props => {
    const {messages} = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                Array.from(messages.values()).map(msg => {
                    const date = new Date(msg.createdAt);
                    const now = new Date();
                    const dateString = (now - date > 24 * 60 * 60 * 1000 || date.getDay() !== now.getDay()) ?
                        date.toLocaleString([], {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        }) : date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                    return (
                        <React.Fragment key={msg.id}>
                            {msg.content !== '' ?
                                <Paper
                                    className={`${classes.message} ${msg.sender === props.username ? classes.selfMessage : null}`}
                                    >
                                    {msg.sender !== props.username ?
                                        <div className={classes.sender}>
                                            <Avatar
                                                className={classes.avatar}>{msg.sender.substr(0, 1).toUpperCase()}</Avatar>
                                            <span>{msg.sender}</span>
                                        </div> : null
                                    }
                                    <p className={classes.content}>{msg.content}</p>
                                    <span
                                        className={`${classes.date} ${msg.sender === props.username ? classes.selfMessageDate : null}`}>{dateString}</span>
                                </Paper> :
                                <Paper className={classes.newUserMessage}>
                                    <span className={classes.joinedText}>{`[${dateString}] `}</span>
                                    {msg.sender === props.username ?
                                        <span className={classes.joinedText}>You</span> : msg.sender}
                                    <span
                                        className={classes.joinedText}> {msg.sender === props.username ? 'have' : 'has'} joined the chat</span>
                                </Paper>
                            }
                        </React.Fragment>
                    )
                })
            }
        </div>
    );

}