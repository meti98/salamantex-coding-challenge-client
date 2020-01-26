import React, { PropsWithChildren, useState } from 'react';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, makeStyles, Theme } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { getLocalUser, deleteLocalUser } from '../authUtils';
import theme from '../theme';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountPage } from './AccountPage';
import { CurrencyAccountPage } from './CurrencyAccountPage';
import { AddCurrencyAccountPage } from './AddCurrencyAccountPage';
import { TransactionPage } from './TransactionPage';
import { SubmitTransactionPage } from './SubmitTransactionPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
  },
  menuItems: {
    marginLeft: 'auto'
  }
}));


export function MeLayout(props: RouteComponentProps) {
    
  const classes = useStyles();

  const [, updateState] = useState();

  if(!getLocalUser())
        return (<Redirect to='/login' />);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Salamantex Transactions
          </Typography>
            <div className={classes.menuItems}>
                
            {[
                {
                    name: 'Transactions',
                    link: '/transactions'
                }, 
                {
                    name: 'Currency Accounts',
                    link: '/currencyAccounts'
                },
                { 
                    name: 'Account',
                    link: '/account'
                }
            ].map((el, index) => (
            <Button color="inherit" component="a" key={el.name} href={'/me'+el.link}>
                {el.name}
            </Button>
            ))}
            <Button color="inherit" onClick={() => {
                deleteLocalUser();
                updateState({});
            }}>
                Logout
            </Button>
        </div>
        </Toolbar>
    </AppBar>
    <div>
        <Route exact path={`${props.match.path}/account`} component={AccountPage} />
        <Route exact path={`${props.match.path}/currencyAccounts`} component={CurrencyAccountPage} />
        <Route exact path={`${props.match.path}/currencyAccounts/add`} component={AddCurrencyAccountPage} />
        <Route exact path={`${props.match.path}/transactions`} component={TransactionPage} />
        <Route exact path={`${props.match.path}/transactions/submit`} component={SubmitTransactionPage} />
    </div>
    </div>
  );
}