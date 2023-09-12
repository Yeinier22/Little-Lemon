import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Main from "./Components/Main";
import React from "react";

function App() {
  return (
    <>
      <Header />
      <ChakraProvider>
        <Main />
      </ChakraProvider>
      <Footer />
    </>
  );
}

export default App;
