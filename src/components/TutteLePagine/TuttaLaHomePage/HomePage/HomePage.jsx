import React from "react"
import HeroHomePage from "../HeroCarouselHomePage/HeroHomePage"
import FiltraVeicoli from "../FilteraVeicoliHomePage/FiltraVeicoli"
import Brand from "../BrandHomePage/Brand"
import Recensioni from "../../Recensioni/AllRecensioni"

const HomePage = () => {
  return (
    <div className="homepage">
      <HeroHomePage />
      <FiltraVeicoli />
      <Brand />
      <div className="mt-2 mb-5">
        <Recensioni />
      </div>
    </div>
  )
}

export default HomePage
