import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { LoginPage } from './pages/LoginPage';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Container, MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import { MeLayout } from './pages/MeLayout';
import { getLocalUser, deleteLocalUser } from './authUtils';
import { RegisterPage } from './pages/RegisterPage';
import { SnackbarProvider, useSnackbar } from 'notistack';


const App: React.FC = () => {

  const [, updateState] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    request: (operation) => {
     const localUser = getLocalUser();
      if(localUser) {
        const token = localUser.token;
        operation.setContext({
          headers: {
            authorization: token ? token : ''
          }
        })
      }
    },
    onError(err) {
      if(err && err.graphQLErrors) {

        enqueueSnackbar(err.graphQLErrors[0].message, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center'
          },
          autoHideDuration: 4000
        })

        if( err.graphQLErrors[0].message === 'Not Authorised!') {
          deleteLocalUser();
          updateState({});
        }
      }
    }
  });



  return (
    <div className="App">
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
            <Container>
              <BrowserRouter>
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/register" component={RegisterPage} />
                  <Route path="/me" component={MeLayout} />
                  <Route exact path="/" render={() => <Redirect to="/login" />} />
              </BrowserRouter>
            </Container>
        </MuiThemeProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
