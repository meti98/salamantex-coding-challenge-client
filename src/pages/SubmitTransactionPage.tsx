import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { Grid, Paper, Box, Button, Select, MenuItem, InputLabel, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import { useSubmitTransactionMutation, useCurrencyAccountsQuery, useCurrenciesQuery, useOtherUsersQuery } from '../graphql/types';
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

export const SubmitTransactionPage : React.FC = () => {

    const classes = useStyles();

    gql` mutation submitTransaction($data: SubmitTransactionInput!) {
            submitTransaction(data: $data) {
                id
            }
    }`;

    gql` query otherUsers {
        otherUsers {
            id,
            name
        }
    }`;

    const [currencyName, setCurrencyName] = useState('');
    const [targetUserId, setTargetUserId] = useState('');

    const {data: currencyAccounts} = useCurrencyAccountsQuery();
    const {data: otherUsers} = useOtherUsersQuery();

    const [submitTransaction, submitTransactionResponse] = useSubmitTransactionMutation();

    if(submitTransactionResponse.data) {
        return <Redirect to="/me/transactions" />;
    }

    return (
        <Container maxWidth="md">
            <h3>Submit Transaction</h3>
            <Grid container justify="center" >
                <Grid item md={6}>
                    <Paper className={classes.paper}>
                        { currencyAccounts && otherUsers &&
                            <Formik 
                                onSubmit={(values) => {
                                    submitTransaction({
                                        variables: {
                                            data: {
                                                amount: values.amount,
                                                currencyName,
                                                targetUserId
                                            }
                                        }
                                    })
                                }}
                                initialValues={{
                                    amount: 0
                                }}
                                render= {() => (
                                    <Form>
                                        <FormControl fullWidth= {true}>
                                            <InputLabel>Currency</InputLabel>
                                            <Select
                                                labelId="select-label"
                                                id="currencyName"
                                                value={currencyName}
                                                name="currencyName"
                                                onChange={(e) => setCurrencyName(e.target.value as string)}
                                                >
                                                {currencyAccounts.me.currencyAccounts.map(
                                                    currencyAccount => <MenuItem value={currencyAccount.currency.name}>{currencyAccount.currency.name}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth= {true}>
                                            <InputLabel>Target User</InputLabel>
                                            <Select
                                                labelId="targetUser"
                                                id="targetUser"
                                                value={targetUserId}
                                                name="targetUser"
                                                onChange={(e) => setTargetUserId(e.target.value as string)}
                                                >
                                                {otherUsers.otherUsers.map(
                                                    otherUser => <MenuItem value={otherUser.id}>{otherUser.name}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                        <DCTextField
                                            label="Amount"
                                            name="amount"
                                            margin="normal"
                                            type="number"
                                            fullWidth= {true}
                                        />
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