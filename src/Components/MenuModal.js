import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  function BasicUsage({children, isOpen, onClose}) {

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} size="full" >
          <ModalOverlay />
          <ModalContent mt="85px"  border= "1px solid rgba(0, 0, 0, 0.8)" bg="white"
>
            <ModalHeader></ModalHeader>
     
            <ModalBody display="flex" justifyContent="center" alignItems="center">
              {children}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default BasicUsage;