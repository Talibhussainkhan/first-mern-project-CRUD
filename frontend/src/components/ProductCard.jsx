import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const handleDelteProduct = async (pid) => {
    const {success, message} = await deleteProduct(pid);
    if(!success){
      toast({
        title:'Error',
        description: message,
        status : 'error',
        duration : 2000,
        isClosable : true
    })    
   }else{
    toast({
      title:'Suceess',
      description: message,
      status : 'success',
      duration : 2000,
      isClosable : true,
  })
      
    }
  };
  const handleUpdateProduct = async (pid, updatedProduct) => {
     const {success, message} = await updateProduct(pid, updatedProduct)
     onClose();
     if(!success){
      toast({
        title:'Error',
        description: "Updated Error",
        status : 'error',
        duration : 3000,
        isClosable : true
    })    
   }else{
    toast({
      title:'Suceess',
      description: 'Product Updated Seccesfully',
      status : 'success',
      duration : 3000,
      isClosable : true,
  })
   }

    }
  return (
    <div>
      <Box
        shadow={"lg"}
        rounded="lg"
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w={"full"}
          objectFit={"cover"}
        />
        <Box p={4}>
          <Heading fontSize={"md"} mb={2}>
            {product.name}
          </Heading>
          <Heading
            fontWeight="light"
            fontSize="md"
          >{`$${product.price}`}</Heading>
        </Box>
        <HStack spacing={2} ml={2} mb={2}>
          <Button colorScheme="blue" onClick={onOpen}>
            <FiEdit />
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDelteProduct(product._id)}
          >
            <MdDelete />
          </Button>
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upadate Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  name="name"
                  placeholder="Updated Product Name"
                  value={updatedProduct.name}
                  onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})}
                 />
                <Input
                  placeholder="Updated Price"
                  name="price"
                  value={updatedProduct.price}
                  onChange={(e) => {
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    });
                  }}
                />
                <Input
                  placeholder="Updated Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) => {
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    });
                  }}
                />
              </VStack>
            </ModalBody>
            <ModalFooter> 
              <Button colorScheme="blue" mr={3} onClick={ ()=> handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
              <Button variant="ghost"  onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default ProductCard;
