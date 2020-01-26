import { Container, Button, Grid, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import gql from 'graphql-tag';
import { useMeQuery, useCurrencyAccountsQuery, useTransactionsQuery } from '../graphql/types';

const useStyles = makeStyles({
    card: {
        marginTop: '10px',
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
});

export const TransactionPage : React.FC = () => {

    const classes = useStyles();

    gql ` query transactions {
        transactions{
            id,
            amount,
            currency {
                name
            },
            createdAt,
            processedAt,
            target {
                name
            },
            source {
                name
            },
            state,
            error
        }
    }`

    const {data: transactions} = useTransactionsQuery();

    if(transactions) {
        console.log(transactions, null, 3);
    }

    return (
        <Container>
            <Grid container justify="center">  
                <Grid item md={12}>
                    <h3>Your Transactions</h3>
                    <div>
                        { transactions && 
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">ID</TableCell>
                                        <TableCell align="right">Currency</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Source</TableCell>
                                        <TableCell align="right">Target</TableCell>
                                        <TableCell align="right">Created at</TableCell>
                                        <TableCell align="right">Processed at</TableCell>
                                        <TableCell align="right">State</TableCell>
                                        <TableCell align="right">Error</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.transactions.map(transaction => (
                                    <TableRow key={transaction.id}>
                                        <TableCell align="right">{transaction.id}</TableCell>
                                        <TableCell align="right">{transaction.currency.name}</TableCell>
                                        <TableCell align="right">{transaction.amount}</TableCell>
                                        <TableCell align="right">{transaction.source.name}</TableCell>
                                        <TableCell align="right">{transaction.target.name}</TableCell>
                                        <TableCell align="right">{transaction.createdAt}</TableCell>
                                        <TableCell align="right">{transaction.processedAt}</TableCell>
                                        <TableCell align="right">{transaction.state}</TableCell>
                                        <TableCell align="right">{transaction.error}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </div>
                    <Button variant="contained" color="primary" component="a" href="transactions/submit">Submit New Transaction</Button>
                </Grid>
            </Grid>  
      </Container>
    );
}
