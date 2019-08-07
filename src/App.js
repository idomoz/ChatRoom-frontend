import React from 'react';
import LogInForm from './LogInForm';
import Messages from './Messages';
import MessageCompose from './MessageCompose';
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import {axios} from './utils'

const styles = () => ({
    root: {
        flexGrow: 1,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: false,
            username: null,
            messages: new Map(),
            latestId: '0',
        };
        // start polling for new messages
        setInterval(() => {
            this.updateMessages();
        }, 500);

        // checks if existing jwt is still valid
        axios.get('/check_jwt')
            .then(({data}) => {
                this.setState({username: data})
            })
            .catch(() => {
            })
    }

    updateMessages() {
        if (!this.state.username)
            return;
        const {messages, latestId} = this.state;
        axios.get('/messages?from=' + latestId)
            .then(({data}) => {
                    if (data.length === 0)
                        return;
                    let newMessage = false;
                    console.log(data);
                    const newMessages = new Map(messages);
                    data.forEach(msg => {
                        if (!newMessages.has(msg.id)) {
                            newMessages.set(msg.id, msg);
                            newMessage = true;
                        }
                    });
                    if (!newMessage)
                        return;
                    this.setState({
                        messages: newMessages,
                        latestId: data[data.length - 1].id.toString(),
                        newMessage: true,
                    })
                }
            )
            .catch(err => {
                this.setState({
                    username: '',
                    messages: new Map(),
                    latestId: '0',
                    newMessage: false
                });
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.newMessage) {
            window.scrollTo(0, document.body.scrollHeight);
            this.setState({newMessage: false});
        }
    }

    render() {
        const {classes} = this.props;
        const {latestId, username, messages} = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Cool Chat
                        </Typography>
                    </Toolbar>
                </AppBar>
                {username ?
                    <React.Fragment>
                        <Messages messages={messages} username={username}/>
                        <MessageCompose sendMessage={(message) => {
                            const newMessages = new Map(messages);

                            const newId = parseInt(latestId) + 1;
                            newMessages.set(newId, {
                                id: newId,
                                createdAt: new Date(),
                                sender: username,
                                content: message
                            });
                            this.setState({messages: newMessages, newMessage: true, latestId: newId});
                            axios.post('/send_message', {content: message}).then(() => this.updateMessages())
                        }}/>
                    </React.Fragment> :
                    <LogInForm login={username => this.setState({username})}/>
                }
            </div>
        );
    }

}

export default withStyles(styles)(App);
