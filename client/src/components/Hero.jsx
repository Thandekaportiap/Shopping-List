
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
    className='w-full h-screen flex items-center justify-between p-10'
  >
    <div className='w-1/2'>
      <h1 className='text-6xl font-bold leading-tight'>
        The best way<br /> to simplify<br /> your shopping
      </h1>
      <h4 className='mt-4 text-lg'>
        Here you can put your short description about your project
      </h4>
    </div>
    
      <img src={HeroImg} alt="cubes" className='h-2/3 w-2/4 rounded-lg' />
   
  </section>
  
  )
}

export default Hero
