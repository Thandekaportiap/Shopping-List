
import React from 'react'
import HeroImg from '../assets/images.jfif'
const Logo = require('../assets/bgColor.jpg');

const Hero = () => {
    
  return (
    <section
    style={{ 
        backgroundImage: `url(${Logo})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }} 
      className='w-full h-screen'
    >
      
   <div className='ml-5 flex flex-col justify-center items-center'>
    
    <h1 className='leading-loose text-6xl font-bold'>The best way<br/> to simplify<br/> your shopping </h1>
    <h4>Here you can put your short description about your project</h4>
    <div style={{marginTop:"2%", display:"flex", flexDirection:"row"}}>
    </div>
   </div>
   <div>
        <img src={HeroImg} alt="cubes" />
   </div>

    </section>
  )
}

export default Hero
