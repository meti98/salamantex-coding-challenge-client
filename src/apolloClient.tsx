import { deleteLocalUser, getLocalUser } from "./authUtils";
import ApolloClient from "apollo-boost";
import { SnackbarMessage, OptionsObject } from "notistack";
import { Dispatch } from 'react';

export function createApolloClient(
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => OptionsObject['key'] | null,
   updateState: Dispatch<any>) {
  
    return new ApolloClient({
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
}