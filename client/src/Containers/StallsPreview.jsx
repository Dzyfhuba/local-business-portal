import axios from "axios";
import { useEffect, useState } from "react";
import Hosts from "../Config/Hosts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { supabase } from "../Config/SupabaseClient";
import Image404 from "../Images/404.jpg";
import { Mousewheel } from "swiper"

const StallsPreview = (props) => {
  const [stalls, setStalls] = useState([])

  useEffect(() =>{
    axios
      .get(Hosts.main + "/stall/few")
      .then(async (res) => {
        if (res.data.status === "success") {
          const mapped = await Promise.all(
            res.data.data.map(async stall => {
              const {data, error} = await supabase.storage.from('profile').getPublicUrl(stall.profile)
              if (error) return {...stall, profile: Image404}
              return {
                ...stall,
                profile: data.publicURL
              } 
            })
          )
          setStalls(mapped);
        }
      })
      .catch((err) => console.error(err))
  }, [])
  
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        mousewheel={(true, {forceToAxis: true})}
        direction={'horizontal'}
        modules={[Mousewheel]}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {stalls.length
          ? stalls.map((stall, index) => (
              <SwiperSlide className="h-80 shadow rounded my-3 overflow-y-hidden" key={index}>
                <Link to={`/stall/${stall.username}`}>
                <LazyLoadImage
                  src={
                    stall.profile
                  }
                  placeholder={<span>asdasd</span>}
                  placeholderSrc={Image404}
                  width="100%"
                  className={"items-center object-cover"}
                  wrapperClassName={'h-3/4 overflow-hidden flex'}
                />
                </Link>
                <article className="p-3">
                  <h1 className="text-lg">
                    <Link to={`/stall/${stall.username}`} className='hover:underline'>{stall.name}</Link>
                  </h1>
                </article>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  )
}

export default StallsPreview