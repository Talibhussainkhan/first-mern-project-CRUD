import { Box, Button, useColorModeValue} from '@chakra-ui/react'
import  {Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")} >
      <Navbar />
      <Routes>
        <Route path='/' element ={<Home />}/>
        <Route path='/create' element ={<CreatePage />}/>
        </Routes>
      </Box>
    </div>
  )
}

export default App