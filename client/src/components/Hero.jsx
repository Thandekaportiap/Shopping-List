import HeroImg from '../assets/images.jfif';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";

const Hero = () => {
  return (
    <section className='w-full h-screen flex flex-col lg:flex-row items-center justify-between px-4 lg:px-12 text-[#C087BF]'>
      <div className='flex flex-col items-start'>
      <h1 className='text-7xl font-bold leading-tight'>
        The best way<br />
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-[#C087Bf] relative inline-block">
            <span className="relative text-white">to simplify</span>
          </span>
        <br /> your shopping
      </h1>
        <h4 className='mt-4 text-xl lg:text-2xl text-[#B1C98D]'>
          Shopping made easy with your simplified List
        </h4>
        <div className='mt-8 flex flex-col items-center justify-center'>
          <Link to={"/DisplayShoppingList"}>
            <button type="button" className='bg-[#C087BF] text-black text-lg lg:text-2xl font-semibold px-4 py-2 rounded-md mt-8 flex items-center'>
              Shopping-List
              <TiShoppingCart className="ml-2 text-white" size={20} />
            </button>
          </Link>
        </div>
      </div>

      <div className="lg:ml-auto lg:text-right mt-10 lg:mt-0">
        <div className="relative z-10 inline-block pt-11 lg:pt-0">
          <img
            src={HeroImg}
            alt="hero"
            className="rounded-tl-3xl w-3/4 lg:w-auto"
          />
          <span className="absolute -bottom-8 -left-8 z-[-1]">
            <svg
              width="93"
              height="93"
              viewBox="0 0 93 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <circle key={i} cx="3.5" cy={(i + 1) * 22} r="3.5" fill="#C087BF" />
              ))}
              {Array.from({ length: 5 }, (_, i) => (
                <circle key={i + 5} cx="25.5" cy={(i + 1) * 22} r="3.5" fill="#C087BF" />
              ))}
              {Array.from({ length: 5 }, (_, i) => (
                <circle key={i + 10} cx="47.5" cy={(i + 1) * 22} r="3.5" fill="#C087BF" />
              ))}
              {Array.from({ length: 5 }, (_, i) => (
                <circle key={i + 15} cx="69.5" cy={(i + 1) * 22} r="3.5" fill="#C087BF" />
              ))}
              {Array.from({ length: 5 }, (_, i) => (
                <circle key={i + 20} cx="91.5" cy={(i + 1) * 22} r="3.5" fill="#C087BF" />
              ))}
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
