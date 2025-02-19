import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const{ createProduct } = useProductStore()
    const toast = useToast()

   const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image : ''
   })
   const handleAddProduct= async ()=>{
    const {success, message} = await createProduct(newProduct);
    if(!success){
        toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
    }else{
        toast({
            title: 'Product Created',
            description: message,
            status: 'success',
            duration: 1000,
            isClosable: true,
          })

    }

    setNewProduct({name:"",price:"",image:""})
   }
  return (
    <div>
      <Container maxW="container.sm" >
        <VStack>
        <Heading mt={4}>
            Create Products
        </Heading >
        <Box w={"full"} mt={4} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={'md'}>
         <VStack spacing={4}>
         <Input
         value={newProduct.name}
         placeholder="Enter Product Name"
         name="name"
         type="text"
         onChange={(e)=> setNewProduct({...newProduct, name:e.target.value})}
         />
         <Input
         value={newProduct.price}
         placeholder="Enter Product Price"
         name="price"
         type="number"
         onChange={(e)=> setNewProduct({...newProduct, price:e.target.value})}
         />
         <Input
         value={newProduct.image}
         placeholder="Enter Image URL"
         name="image"
         type="text"
         onChange={(e)=> setNewProduct({...newProduct, image:e.target.value})}
         />
         <Button w={'full'} colorScheme="blue" onClick={handleAddProduct}>Add Product</Button>
         </VStack>
        </Box>
        </VStack>
      
      </Container>
    </div>
  );
};

export default CreatePage;
