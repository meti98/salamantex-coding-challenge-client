import Container from '@material-ui/core/Container';
import React from 'react';
import { Grid, Paper, Button, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import { useRegisterMutation } from '../graphql/types';
import { RedirectWhenAuth, setLocalUser } from '../authUtils';
import { Formik, Form } from "formik";
import { DCTextField } from '../components/DCTextField';

const useStyles = makeStyles({
    root: {
        marginTop: 100
    },
    paper: {
        padding: 20
    },
    orLoginButton: {
        textDecoration:"none",
        color: '#005ff8'
    }
})

export const RegisterPage : React.FC = () => {

    const classes = useStyles();

    gql` mutation register($data: RegisterInput!) {
        register(data: $data) {
            token,
            user {
                id,
                name
            }
        }
    }`;

    const [register, registerRes] = useRegisterMutation();
    
    if(registerRes.data) {
        setLocalUser(registerRes.data.register);
    }

    return (
        <RedirectWhenAuth>
            <Container className={classes.root} maxWidth="md">
                <Grid container justify="center" >
                    <Grid item md={6}>
                        <Paper className={classes.paper}>
                            <h3>Register</h3> 
                            <span>
                                or 
                                <a href="/login" className={classes.orLoginButton} > login</a>
                            </span>
                            <Formik 
                                onSubmit={async (values) => {
                                    await register({
                                        variables: {
                                            data: values
                                        }
                                    })
                                }}
                                initialValues={{
                                    name: "",
                                    email: "",
                                    password: "",
                                    maxAmountPerTransactionDollar: 0
                                }}
                                render= {(formikBag) => (
                                    <Form>
                                        <DCTextField
                                            label="Name"
                                            name="name"
                                            margin="normal"
                                            fullWidth= {true}
                                        />
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
                                        <DCTextField
                                            label="Description"
                                            name="description"
                                            margin="normal"
                                            fullWidth={true}
                                        />
                                        <DCTextField
                                            label="Max amount per transcation ($)"
                                            name="maxAmountPerTransactionDollar"
                                            margin="normal"
                                            type="number"
                                            fullWidth={true}
                                        />
                                        <div style={{textAlign: 'right'}}>
                                            <Button variant="contained" color="primary" type='submit'>Register</Button>
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