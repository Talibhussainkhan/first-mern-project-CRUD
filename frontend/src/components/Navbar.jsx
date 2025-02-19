import { Button, Container, Flex, Heading, HStack, useColorMode} from "@chakra-ui/react";
import React from "react";
import { IoCreateOutline, IoHomeOutline, IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
    const{colorMode, toggleColorMode} = useColorMode()
  return (
    <div>
      <Container maxW={"1140px"} p={"4px"} >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base : "column" , sm:"row"}} >
        <Heading
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          fontWeight="extrabold"
          >
          <Link to={"/"}>Product Store 🛒 </Link>
        </Heading>
        <HStack>
            <Link to={'/'} ><Button fontSize={22}> <IoHomeOutline /></Button></Link>
            <Link to={"/create"}><Button fontSize={22}><IoCreateOutline /> </Button></Link>
            <Button onClick={toggleColorMode}>{colorMode === "light"? <IoMoon />:<LuSun fontSize={20}/>}</Button>
        </HStack>
        </Flex>
      </Container>
    </div>
  );
};

export default Navbar;
