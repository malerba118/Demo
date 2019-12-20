import React from "react";
import App from "next/app";
import UserContext from "../UserContext";
import { SnackbarProvider } from 'notistack';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SnackbarProvider maxSnack={3}>
        <UserContext.Provider value={{ signedIn: true, userName: "Pigeon" }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </SnackbarProvider>
    );
  }
}

export default MyApp;
