import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { Grid, Paper, Box, TextField, Button, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import { useLoginMutation } from '../graphql/types';
import { RedirectWhenAuth, setLocalUser } from '../authUtils';
import { Formik, withFormik, FormikProps, Form, Field } from "formik";
import { DCTextField } from '../components/DCTextField';

const useStyles = makeStyles({
    root: {
        marginTop: 100
    },
    paper: {
        padding: 20
    },
    orRegisterButton: {
        textDecoration:"none",
        color: '#005ff8'
    }
})

export const LoginPage : React.FC = () => {

    const classes = useStyles();

    gql` mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token,
            user {
                id,
                name
            }
        }
    }  
    `;

    const [login, loginRes] = useLoginMutation();
    
    if(loginRes.data) {
        setLocalUser(loginRes.data.login);
    }

    return (
        <RedirectWhenAuth>
            <Container className={classes.root} maxWidth="md">
                <Grid container justify="center">
                    <Grid item md={6}>
                        <Paper className={classes.paper}>
                            <h3>Login</h3>
                            <span>
                                or 
                                <a href="/register" className={classes.orRegisterButton}> create a new account</a>
                            </span>
                            <Formik 
                                onSubmit={(values) => login({ variables: values})}
                                initialValues={{
                                    email: "",
                                    password: ""
                                }}
                                render= {(formikBag) => (
                                    <Form>
                                        <DCTextField
                                            label="E-Mail"
                                            name="email"
                                            margin="normal"
                                            type="email"
                                            fullWidth= {true}
                                        />
                                        <DCTextField
                                            label="Password"
                                            name="password"
                                            margin="normal"
                                            type="password"
                                            fullWidth={true}
                                        />
                                        <div style={{textAlign: 'right'}}>
                                        <Button variant="contained" color="primary" type='submit'>Login</Button>
                                        </div>
                                    </Form>
                                )
                            }/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </RedirectWhenAuth>
    );
}