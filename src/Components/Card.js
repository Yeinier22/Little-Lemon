import { HStack, Heading, Image, VStack, Text} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Card.css";

const Card = ({ title, description, imageSrc, price }) => {
  return (
    <VStack
      bg="#ECEEED"
      alignItems="center"
      cursor="pointer"
    >
      <Image
        src={imageSrc}
        alt={title}
        borderTopLeftRadius="xl"
        borderTopRightRadius="xl"
      />
      <VStack p={4} spacing={8}  height="100%" alignItems="flex-start"> 
        <HStack spacing={30}  width="100%" justifyContent="space-between">
          <Heading as="h4" size="md">{title}</Heading>
          <Text color="red" fontWeight="bold">{price}</Text>
        </HStack>
        <HStack mb="20px">
          <Text textAlign="left">
            {description}
          </Text>
        </HStack>
        <HStack  marginTop="auto"  alignItems="center" id="order-delivery">
          <Text mr={5}>Order delivery</Text>
          <FontAwesomeIcon icon={faTruck} />
        </HStack></VStack>
      </VStack>
  );
};

export default Card;
