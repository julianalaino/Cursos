import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette : {
        primary : {
        light : "#63a4fff",
        main : "#1976d2",
        dark : "#004ba0",
        contrastText : "#ecfad8"
        }
    }

});

export default theme;