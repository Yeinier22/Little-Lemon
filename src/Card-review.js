import { Avatar, VStack, Text, HStack} from "@chakra-ui/react";
import React from "react";
import Rating from "./Components/Star/Star";

const CardReview=({name, photo, review, rating, color}) => {
    return(
        <VStack alignItems="flex-start" ml={4} mr={4} mt={4} mb={4}
        >
            <HStack spacing={4} >
            <Avatar src={photo} name={name} size="md" bg={color} fontSize={10} /> 
            <Text>{name}</Text>
            </HStack>
            <Rating rating={rating}/>
            <p><em>{review}</em></p>
            
        </VStack>
    )};
    
    export default CardReview;