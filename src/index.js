import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#64efeb',
            main: '#19bcb9',
            dark: '#008b89',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffff56',
            main: '#ffea00',
            dark: '#c7b800',
            contrastText: '#000',
        },
    },
    typography: {
        fontFamily: 'Roboto',
        fontWeightLight: 500,
        fontWeightRegular: 600,
        fontWeightMedium: 700,
        useNextVariants: true,
    },
});
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root'));

