import { Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { fetchProduct , products } = useProductStore();
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div>
      <Container maxW="container.xl" py={5}>
        <VStack spacing={8}>
          <Heading>Currect Product</Heading>
        </VStack>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
          mt={4}
        >
          {
            (products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            }))
          }
        </SimpleGrid>
       {products.length === 0 &&(
         <Text
         fontSize={"xl"}
         textAlign={"center"}
         fontWeight={"bold"}
         color="gray.500"
       >
         No product found 😢{" "}
         <Link to={"/create"}>
           <Text
             as="span"
             color={"blue.500"}
             _hover={{ textDecoration: "underline" }}
           >
             Create a Product
           </Text>
         </Link>
       </Text>
       )}


      </Container>
    </div>
  );
};

export default Home;
