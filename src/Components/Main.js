import FullScreenSlider from "./FullScreenSlider";
import Testimonial from "./Review";
import { ChakraProvider } from "@chakra-ui/react";
import About from "./About";

const Main = () => {
  return (
    <main>
      <FullScreenSlider />
  <About />
      <ChakraProvider>
        <Testimonial />
      </ChakraProvider>
    </main>
  );
};

export default Main;
