import { Box, VStack, Heading, HStack, Button } from "@chakra-ui/react";
import Card from "./Card.js";
import React from "react";

const specials = [
  {
    title: "Greek salad",
    description: `The famous greek salad of crispy lettuce, peppers, olives
        and our Chicago, style feta faCheese, garnished with crunchy garlic and rosemary croutons.`,
    price: "$12.99",
    getImageSrc: () => require("../images/greek salad.jpg"),
  },
  {
    title: "Bruchetta",
    description: `Our Brushetta is made from grilled bread that has been smeared with
    garlic and seasoned with salt and olive oil.
     `,
    price: "$5.99",
    getImageSrc: () => require("../images/bruchetta.jpg"),
  },
  {
    title: "Lemon Dessert",
    description: `This comes straigt from grandma's receipe book, every last
    ingredient has been sourced and is as authentic as can be imagined.`,
    price: "$5.00",
    getImageSrc: () => require("../images/lemon dessert.jpg"),
  },
];

const Specials = () => {
  return (
    <VStack
      bg="white"
      p={8}
      alignItems="flex-start"
      spacing={8}
      minHeight="100vh"
      ml="15%"
      mr="15%"
      mt={50}
    >
      <HStack justifyContent="space-between" width="100%">
      <Heading as="h1" id="projects-section">
        This week specials!
      </Heading>
      <Button borderRadius="10px" bg="#EAC630">Online Menu</Button>
      </HStack>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3,minmax(0,1fr))"
        gridGap={8}
      >
        {specials.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            description={project.description}
            imageSrc={project.getImageSrc()}
            price={project.price}
          />
        ))}
      </Box>
    </VStack>
  );
};

export default Specials;
