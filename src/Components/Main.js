import Specials from "./Highlight";
import Hero from "./Hero";
import Testimonial from "./Review";
import { ChakraProvider } from "@chakra-ui/react";
import About from "./About";

const Main = () => {
  return (
    <main>
      <Hero />
      <ChakraProvider>
        <Specials />
        <Testimonial />
      </ChakraProvider>
      <About />
    </main>
  );
};

export default Main;
