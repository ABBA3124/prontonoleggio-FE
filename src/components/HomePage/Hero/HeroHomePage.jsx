import React from "react"
import { Carousel } from "react-bootstrap"
import "./HeroHomePage.css"
import Hero1 from "../Hero/img/hero-1.jpg"
import Hero2 from "../Hero/img/hero-2.jpg"
import Hero4 from "../Hero/img/hero-4.jpg"

const HeroHomePage = () => {
  return (
    <div className="hero-image">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={Hero1} alt="First slide" />
          <Carousel.Caption>
            <h6>Qualsiasi auto di lusso a basso prezzo</h6>
            <h1 className="">PRONTO NOLEGGIO</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Hero2} alt="Second slide" />
          <Carousel.Caption>
            <h6>Noleggio facile e veloce</h6>
            <h1 className="">GUIDA IL MEGLIO</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div id="prova" className="position-relative">
            <div className="overlay"></div>
            <img className="d-block w-100" src={Hero4} alt="Third slide" />
            <Carousel.Caption>
              <h6>Prenotazioni online sicure</h6>
              <h1 className="">VIAGGIA CON STILE</h1>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default HeroHomePage
