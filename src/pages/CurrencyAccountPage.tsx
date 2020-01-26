import { Container, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, Divider, Theme, Table, TableContainer, Paper, TableBody, TableRow, TableCell, Card, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import gql from 'graphql-tag';
import { useMeQuery, useCurrencyAccountsQuery } from '../graphql/types';

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
  

export const CurrencyAccountPage : React.FC = () => {

    const classes = useStyles();

    gql` query currencyAccounts {
        me {
            currencyAccounts {
                id,
                balance,
                walletId,
                currency {
                    name,
                    exchangeRateDollar
                }
            }
        }
    }`

    const { data } = useCurrencyAccountsQuery();

    return (
        <Container maxWidth="md">
            <Grid container justify="center">  
                <Grid item md={8}>
                    <h3>Your Currency Accounts</h3>
                    <div>
                        { data &&
                            data.me.currencyAccounts.map((currencyAccount) => (
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                            {currencyAccount.currency.name}
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {currencyAccount.walletId}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {currencyAccount.balance} coins
                                    </Typography>
                                </CardContent>
                            </Card>
                            ))
                        }

                        <Button variant="contained" color="primary" component="a" href="currencyAccounts/add">Add Currency Account</Button>
                    </div>
                </Grid>
            </Grid>  
      </Container>
    );
}
