import React from "react"
import "./HomePage.css"
import HeroHomePage from "../Hero/HeroHomePage"
import FiltraVeicoli from "../FilterVeicoli/FiltraVeicoli"
import Brand from "../Brand/Brand"

const HomePage = () => {
  return (
    <div className="homepage">
      <HeroHomePage />
      <FiltraVeicoli />
      <div className="spazioBrand">
        <Brand />
      </div>
    </div>
  )
}

export default HomePage
