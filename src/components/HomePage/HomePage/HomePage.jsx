import React from "react"
import HeroHomePage from "../Hero/HeroHomePage"
import FiltraVeicoli from "../FilterVeicoli/FiltraVeicoli"
import Brand from "../Brand/Brand"
import Recensioni from "../../Page/Recensioni/AllRecensioni"

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
