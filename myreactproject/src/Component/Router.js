import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../Component/Home/Home';
import Filter from '../Component/Filter/Filter';
import Details from '../Component/Details/Details';
import Header from '../Component/Home/Header'
import '../Style/Home.css'
import '../Style/Filter.css'
import '../Style/Details.css'

export default function Router() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Filter" element={<Filter/>}/>
        <Route path="/Details" element={<Details/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
