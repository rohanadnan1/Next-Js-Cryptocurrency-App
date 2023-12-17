"use client";
 
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import store from "./store/store";
import { Provider } from "react-redux";

 
 
export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());
 
  return (
   <Provider store={store}>
     <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
   </Provider>
  );
}

export default ReactQueryProvider;