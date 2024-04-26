import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import React from 'react'
import chicken from '../../Asset/chicken.png'
import dinner from '../../Asset/dinner.jpg'
import beverage from '../../Asset/juice.jpg'


export default function MyCarousel() {
  return (
    <Carousel showThumbs={false}>
    <div>
        <img src={chicken} alt="not found" className="img"/>
    </div>
    <div>
        <img src={dinner}  alt="not found" className="img"/>
    </div>
    <div>
        <img src={beverage} alt="not found" className="img"/>
    </div>
    </Carousel>
  )
}
