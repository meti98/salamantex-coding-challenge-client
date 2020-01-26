import React from "react";
import { Redirect } from "react-router";

const LOCAL_USER_ID = 'local_user';

interface LocalUser {
    token: string
    user: {
        id: string
    }
}

export function setLocalUser(user: LocalUser) {
    localStorage.setItem(LOCAL_USER_ID, JSON.stringify(user));
}

export function getLocalUser(): LocalUser | null {
    const localUserString = localStorage.getItem(LOCAL_USER_ID);
    if(!localUserString) {
        return null;
    }
    return JSON.parse(localUserString) as LocalUser;
}

export function deleteLocalUser() {
    localStorage.removeItem(LOCAL_USER_ID);
}


export const RedirectWhenAuth : React.FC<{}> = ({children}) => {

    if(getLocalUser())
        return <Redirect to='me/account'/>

    return <div>{children}</div>;
}