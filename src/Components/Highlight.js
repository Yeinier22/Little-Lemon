import { Box, Heading, HStack, Button } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Highligh.css";
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

const specials = [
  {
    title: "Greek salad",
    description: `The famous greek salad of crispy lettuce, peppers, olives
        and our Chicago, style feta faCheese, garnished with crunchy garlic and rosemary croutons.`,
    price: "$12.99",
    imageSrc: require("../images/greek salad.jpg"),
  },
  {
    title: "Bruchetta",
    description: `Our Brushetta is made from grilled bread that has been smeared with
    garlic and seasoned with salt and olive oil.
     `,
    price: "$5.99",
    imageSrc: require("../images/bruchetta.jpg"),
  },
  {
    title: "Lemon Dessert",
    description: `This comes straigt from grandma's receipe book, every last
    ingredient has been sourced and is as authentic as can be imagined.`,
    price: "$5.00",
    imageSrc: require("../images/lemon dessert.jpg"),
    /*getImageSrc: () => require("../images/lemon dessert.jpg"),*/
  },
];

const Specials = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <Box
      id="special-container"
      p={8}
      alignItems="flex-start"
      spacing={8}
      height="100vh"
      ml="10%"
      mr="10%"
      mt={70}
    >
      <HStack
        id="special-heading"
        justifyContent="space-between"
        width="100%"
        mb="10px"
        mt="10px"
      >
        <Heading as="h1" id="special-title">
          This week specials!
        </Heading>
        <Button 
          borderRadius="20px" 
          bg="#cf2e2e" 
          fontFamily="Montserrat Bold"
          color="white"
          minW={110}
          minH={45}
          onClick={() => navigate('/menu')}
          _hover={{ bg: "darkred" }}
        >
          Order Online
        </Button>
      </HStack>
      <Box>
        {isMobile ? (
          <Carousel
            showArrows={true}
            autoPlay={true}
            interval={5000}
            infiniteLoop={true}
            transitionTime={2000}
            showThumbs={true}
          >
            {specials.map((project) => (
              <div className="special-container">
                <div className="special-img">
                  <img
                    alt={project.title}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    src={project.imageSrc}
                    /*imageSrc={project.getImageSrc()}*/
                    price={project.price}
                  />
                </div>
                <div className="special-description-container">
                  <div className="special-price">
                    <h3>{project.title}</h3>
                    <p>{project.price}</p>
                  </div>
                  <div className="special-description">
                    <p>{project.description}</p>
                  </div>
                  <div className="special-descrip-footer">
                    <p>Order delivery</p>
                    <FontAwesomeIcon icon={faTruck} />
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(3,minmax(0,1fr))"
            gridGap={8}
          >
            {specials.map((project) => (
               <div className="special-container"   key={project.title}>
               <div className="special-img">
                 <img
                   alt={project.title}
                   title={project.title}
                   description={project.description}
                   src={project.imageSrc}
                   /*imageSrc={project.getImageSrc()}*/
                   price={project.price}
                 />
               </div>
               <div className="special-description-container">
                 <div className="special-price">
                   <h3>{project.title}</h3>
                   <p>{project.price}</p>
                 </div>
                 <div className="special-description">
                   <p>{project.description}</p>
                 </div>
                 <div className="special-descrip-footer">
                   <p>Order delivery</p>
                   <FontAwesomeIcon icon={faTruck} />
                 </div>
               </div>
             </div>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Specials;
