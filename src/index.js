import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router";
import 'simplebar-react/dist/simplebar.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));


const theme = createTheme({
  palette: {
    mode:"light", //dark
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
    verde:{
     main:'#58d68d',
   
    }


  },
});
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

