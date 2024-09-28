
import HeroImg from '../assets/images.jfif'
import Shopping2 from '../assets/shopping-list1.png'
import Shopping3 from '../assets/shopping-list2.png'


const Hero = () => {
    
  return (
    <section className='w-full h-screen flex items-center justify-between p-10 text-[#C087BF]'
  >
    <div className='w-1/2'>
      <h1 className='text-6xl font-bold leading-tight'>
        The best way<br /> to simplify<br /> your shopping
      </h1>
      <h4 className='mt-4 text-lg'>
        Here you can put your short description about your project
      </h4>
    </div>
    
    <img
                  src={Shopping2}
                  alt="shopping"
                  className="absolute bottom-0 right-0 rotate-225 rounded-tl-3xl size-28"
                />
      <img
                  src={Shopping3}
                  alt="shopping"
                  className="rounded-tl-3xl size-24"
                />
      <div className="w-full px-4 lg:w-6/12">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative z-10 inline-block pt-11 lg:pt-0">
                <img
                  src={HeroImg}
                  alt="hero"
                  className="rounded-tl-3xl "
                />
                <span className="absolute -bottom-8 -left-8 z-[-1]">
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
