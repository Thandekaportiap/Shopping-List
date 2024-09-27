
import React from 'react'
import HeroImg from '../assets/images.jfif'
const Logo = require('../assets/bgColor.jpg');

const Hero = () => {
    
  return (
    <section
    // style={{ 
    //   backgroundImage: `url(${Logo})`, 
    //   backgroundSize: 'cover', 
    //   backgroundPosition: 'center' 
    // }} 
    className='w-full h-screen flex items-center justify-between p-10 text-[#C087BF]'
  >
    <div className='w-1/2'>
      <h1 className='text-6xl font-bold leading-tight'>
        The best way<br /> to simplify<br /> your shopping
      </h1>
      <h4 className='mt-4 text-lg'>
        Here you can put your short description about your project
      </h4>
    </div>
    
      {/* <img src={HeroImg} alt="cubes" className='h-2/3 w-2/4 rounded-lg' /> */}
      <div class="w-full px-4 lg:w-6/12">
            <div class="lg:ml-auto lg:text-right">
              <div class="relative z-10 inline-block pt-11 lg:pt-0">
                <img
                  src={HeroImg}
                  alt="hero"
                  class="max-w-full lg:ml-auto"
                />
                <span class="absolute -bottom-8 -left-8 z-[-1]">
                  <svg
                    width="93"
                    height="93"
                    viewBox="0 0 93 93"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="3.5" cy="25.5" r="3.5" fill="#C087BF" />
                    <circle cx="3.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="3.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="3.5" cy="91.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="25.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="91.5" r="3.5" fill="#C087BF" />
                    <circle cx="47.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="47.5" cy="25.5" r="3.5" fill="#C087BF" />                    
                    <circle cx="47.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="47.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="47.5" cy="91.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="25.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="91.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="25.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="91.5" r="3.5" fill="#C087BF" />     
                  </svg>
                </span>
              </div>
              </div>
              </div>
   
  </section>
  
  )
}

export default Hero
