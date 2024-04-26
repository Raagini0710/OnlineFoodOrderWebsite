import {Tab, Tabs, TabList, TabPanel} from "react-tabs"
import "react-tabs/style/react-tabs.css";
import React, { useEffect ,useState} from 'react'
import axios  from 'axios'
import queryString from 'query-string';


export default function MyTabs(){
  const [restaurant, setRestaurant]=useState([]);
  const parsed=queryString.parse(window.location.search);
  const id = parsed.restaurant;
  console.log(id);

  useEffect(()=>{
    axios.get(`http://localhost:8900/getRestaurantsByid/${id}`)
    .then((res)=>{
      setRestaurant(res.data);
    })
    .catch(err=>err)
     console.log(restaurant)
  },[restaurant.name,id])

  return (
  <div style={{margin:"20px"}}>
    {restaurant.map(restaurant=>{
      return <div>
        {/* <h3 style={{fontWeight:"bold"}}>{`${restaurant.name}`}</h3>
      <button className="order">Place Order Online</button>
      <br/> */}
      <Tabs>
          <TabList>
              <Tab style={{fontWeight:"bold"}}>Overview</Tab>
              <Tab style={{fontWeight:"bold"}}>Contact</Tab>
          </TabList>
  
          <TabPanel>
              <h3><b>About This Place</b></h3>
              <br/>
              <h5><b>{`Rating:${restaurant.rating_text}`}</b></h5>
              <h5>{`City:${restaurant.city}`}</h5>
              <br/>
              
          </TabPanel>
          <TabPanel>
              <h6><b>Phone Number</b></h6>
              <div style={{color:"red"}}>{`${restaurant.contact_number}`}</div>
              <br/>
              <h6><b>{`Name:${restaurant.rating_text}`}</b></h6>
              <div> {`Locality:${restaurant.locality}`}</div>
          </TabPanel>
      </Tabs>
      </div>
    })}
    </div>
  )
}
