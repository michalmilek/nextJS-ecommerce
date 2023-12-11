"use client";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { store } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </SessionProvider>
  );
};

export default Providers;
