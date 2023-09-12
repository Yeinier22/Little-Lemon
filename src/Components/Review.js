import { Heading, VStack, HStack } from "@chakra-ui/react";
import CardReview from "../Card-review";
import React from "react";

const reviews = [
  {
    name: "Zack A.",
    review: `"Fantastic food and great service. Juan Chipoco’s restaurants never disappoint. 
  The chicken and green rice were delicious and the sauces were amazing."`,
  getImageSrc: () => require("../images/Avatar/beach-418742_640.jpg"),
  rating: 3.5
  },
  {
    name: "Narish B.",
    review: `"Everything good service was great and the food also I will recommend this 
  restaurant for all of the people and the location is great"`,
  getImageSrc: () => require("../images/Avatar/mountains-1587287_640.jpg"),
  rating: 5
  },
  {
    name: "Frank E.",
    review: `"Wow, everything is so fresh and good. I will give them five stars!! Royer was a great server. 
  Very friendly and helpful. We’ll be back again."`,
  getImageSrc: () => require("../images/Avatar/sunset-1373171_640.jpg"),
  rating:5
  },
  {
    name: "Rick S.",
    review: `"Great casual place with delicious Peruvian BBQ, ceviches and more. 
    Mauricio was super helpful explain the menu and delivered top notch service!"`,
    getImageSrc: () => require("../images/Avatar/tree-736885_640.jpg"),
    rating:5
  },
];



const Testimonial = () => {
  return (
    <VStack 
    ml="15%" 
    mr="15%" 
    p={8} 
    spacing={20}

    >
      <Heading as="h2">Testimonials</Heading>
      <HStack display="flex" width="100%" justifyContent="space-between" spacing={20} alignItems="flex-start" >
        {reviews.map((project, index) => (
          <CardReview
            key={project.name1}
            color={project.color}
            name={project.name}
            review={project.review}
            photo={project.getImageSrc()}
            rating={project.rating}
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default Testimonial;
