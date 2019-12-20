import React from "react";
import App from "next/app";
import UserContext from "../UserContext";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContext.Provider value={{ signedIn: true, userName: "Pigeon" }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}

export default MyApp;
