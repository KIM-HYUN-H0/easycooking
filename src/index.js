import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'mobx-react';
import * as serviceWorker from './serviceWorker';
import categoryStore from './stores/category'
import {
  useTheme,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'KyoboHand',
    fontSize : '16'
  },
});

const category = new categoryStore();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
  <Provider category={category}>
    <App />
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
