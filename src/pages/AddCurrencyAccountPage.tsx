import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { Grid, Paper, Box, Button, Select, MenuItem, InputLabel, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import { useLoginMutation, useAddCurrencyAccountMutation, useCurrencyAccountsQuery, useCurrenciesQuery } from '../graphql/types';
import { RedirectWhenAuth } from '../authUtils';
import { Formik, withFormik, FormikProps, Form, Field } from "formik";
import { DCTextField } from '../components/DCTextField';
import { Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
    paper: {
        padding: 20
    }
})

export const AddCurrencyAccountPage : React.FC = () => {

    const classes = useStyles();

    gql` query currencies {
        currencies {
            id,
            name,
            exchangeRateDollar
        }
    }`

    gql` mutation addCurrencyAccount($data: CurrencyAccountInput!) {
        addCurrencyAccount(data: $data) {
            id
        }
    }`;

    const {data: currencies} = useCurrenciesQuery();
    const [addCurrencyAccount, {data: currencyAccount}] = useAddCurrencyAccountMutation();

    const [currencyName, setCurrencyName] = useState('')


    if(currencyAccount) {
        return <Redirect to="/me/currencyAccounts" />;
    }

    return (
        <Container maxWidth="md">
            <h3>Add Currency Account</h3>
            <Grid container justify="center" >
                <Grid item md={6}>
                    <Paper className={classes.paper}>
                        { currencies &&
                            <Formik 
                                onSubmit={(values) => {
                                    addCurrencyAccount({
                                        variables: {
                                            data: {
                                                ...values,
                                                currencyName
                                            }
                                        }
                                    })
                                }}
                                initialValues={{
                                    walletId: "",
                                    balance: 0
                                }}
                                render= {() => (
                                    <Form>
                                        <DCTextField
                                            label="WalletId"
                                            name="walletId"
                                            margin="normal"
                                            fullWidth= {true}
                                        />
                                        <DCTextField
                                            label="Balance"
                                            name="balance"
                                            margin="normal"
                                            type="number"
                                            fullWidth= {true}
                                        />
                                        <FormControl fullWidth= {true}>
                                            <InputLabel>Currency</InputLabel>
                                            <Select
                                                labelId="select-label"
                                                id="currencyName"
                                                value={currencyName}
                                                name="currencyName"
                                                onChange={(e) => setCurrencyName(e.target.value as string)}
                                                >
                                                {currencies.currencies.map(currency => <MenuItem value={currency.name}>{currency.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <div style={{textAlign: 'right'}}>
                                            <Button variant="contained" color="primary" type='submit'>Add</Button>
                                        </div>
                                    </Form>
                                )
                            }/>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}