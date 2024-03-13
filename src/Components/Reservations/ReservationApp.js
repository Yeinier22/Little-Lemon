import { ChakraProvider } from "@chakra-ui/react"; 
//import { useButton1 } from "./Context/alertContext";
import Alert from "./DetailsReservation/alert";
import Reservation from "./Reservations";
//import { AvailableProvider } from "./Context/availableContext";
import { AvailableAlert } from "./Context/alertContext";
//import { useAlert } from "./Context/alertContext";

function ReserApp() { 
  return ( 
      <AvailableAlert>
        <Reservation /> 
        <ChakraProvider>
            <Alert />
        </ChakraProvider>
      </AvailableAlert> 
  );
 }

export default ReserApp ;