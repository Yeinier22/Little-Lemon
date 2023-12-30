import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
  } from "@chakra-ui/react";
  import { useRef } from "react";
import { useAlert} from "../Context/alertContext";
  
  /**
   * This is a global component that uses context to display a global alert message.
   */
  function Alert() {
    const { isOpen, onClose } = useAlert();
    const cancelRef = useRef();
  
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent py={4} backgroundColor={ '#81C784' }>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                All good!
            </AlertDialogHeader>
            <AlertDialogBody>You have successfully scheduled a reservation</AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }
  
  export default Alert;