import React, {createContext} from "react";
import {ISignInCookie} from "../interfaces.ts";

interface ICookieContext {
    signInCookie: ISignInCookie | undefined,
    setSignInCookie:  React.Dispatch<React.SetStateAction<ISignInCookie | undefined>>
}

export const CookieContext = createContext<ICookieContext | undefined>(undefined);
