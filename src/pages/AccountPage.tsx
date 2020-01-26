import { Container, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, Divider, Theme, Table, TableContainer, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import gql from 'graphql-tag';
import { useMeQuery } from '../graphql/types';

const useStyles = makeStyles({
    table: {
      width: '40%',
      marginLeft: '30%'
    }
});
  
  
export const AccountPage : React.FC = () => {

    const classes = useStyles();

    gql` query me {
        me {
            id,
            name,
            email,
            maxAmountPerTransactionDollar,
            description
        }
    }`

    const { data } = useMeQuery();

    return (
        <main>
            <h3>Your Account</h3>
            <div>
                { data &&
                    (<TableContainer className={classes.table} component={Paper}>
                        <Table aria-label="simple table">
                          <TableBody>
                              <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell align="right">{data.me.name}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">E-Mail</TableCell>
                                <TableCell align="right">{data.me.email}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Description</TableCell>
                                <TableCell align="right">{data.me.description}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Max amount per transaction ($)</TableCell>
                                <TableCell align="right">{data.me.maxAmountPerTransactionDollar}</TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>)
                }
            </div>
      </main>
    );
}
