import { Box, VStack, Heading, HStack, Button } from "@chakra-ui/react";
import Card from "./Card.js";
import React, { useEffect, useState } from "react";
import "../Styles/Highligh.css";
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";


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

  const [isMobile, setIsMobile]=useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 850);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);



  return (
    <Box id="special-container"
      p={8}
      alignItems="flex-start"
      spacing={8}
      height="100vh"
      ml="10%"
      mr="10%"
      mt={70}
    >
      <HStack id="special-heading" justifyContent="space-between" width="100%" mb="10px" mt="10px">
      <Heading as="h1" id="special-title" >
        This week specials!
      </Heading>
      <Button borderRadius="10px" bg="#EAC630" minW={110}>Online Menu</Button>
      </HStack>
      <Box>
        {isMobile ? (
            <Carousel showArrows={true} autoPlay={true} interval={5000} infiniteLoop={true} transitionTime={2000} >
            {specials.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                imageSrc={project.getImageSrc()}
                price={project.price}
              />
            ))}           
          </Carousel>
        ) : (
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
        )}
      </Box>
    </Box>
  );
};

export default Specials;
