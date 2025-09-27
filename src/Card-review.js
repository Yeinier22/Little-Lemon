import { Avatar, VStack, Text, HStack, Box} from "@chakra-ui/react";
import React from "react";
import Rating from "./Components/Star/Star";

const CardReview=({name, photo, review, rating, color, featured = false}) => {
    return(
        <VStack 
            alignItems="flex-start" 
            ml={2} 
            mr={2} 
            mt={3} 
            mb={3}
            p={5}
            borderRadius="lg"
            boxShadow="md"
            bg="white"
            w="100%"
            spacing={3}
            border="1px solid #e2e8f0"
            minH="280px"
        >
            <HStack spacing={4} alignItems="center" width="100%">
                <Avatar src={photo} name={name} size="md" bg={color} fontSize={10} /> 
                <VStack alignItems="flex-start" spacing={1} flex={1}>
                    <Text fontWeight="bold" fontSize="md" color="#495E57">{name}</Text>
                    <Rating rating={rating}/>
                </VStack>
            </HStack>
            
            <Box>
                <Text 
                    fontSize="sm" 
                    color="#333333" 
                    lineHeight="1.5" 
                    fontStyle="italic"
                    textAlign="left"
                    fontWeight="normal"
                    noOfLines={4}
                >
                    "{review}"
                </Text>
            </Box>
            
        </VStack>
    )};
    
    export default CardReview;