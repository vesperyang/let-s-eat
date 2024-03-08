import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { Component }from "react";
import SearchBar from './components/search'
import AppBar from './components/AppBar'
import About from './components/About'
import Input from'./components/bmi/Input'
import './App.css'
import axios from "axios";
import { useState, useEffect } from 'react';

function App () {
 
   
    return (
       <>
      
       <BrowserRouter>
         <AppBar> </AppBar>  
         <body>
         <Input></Input> 
         </body>
         <Routes>
         <Route path="/" element={<SearchBar />} />  
         </Routes>
        
       </BrowserRouter>
     </>
    );
  }

export default App