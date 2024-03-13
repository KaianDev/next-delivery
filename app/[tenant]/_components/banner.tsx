"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import { Autoplay } from "swiper/modules"

// Styles
import "swiper/css"

export const Banner = () => {
  return (
    <div className="container mx-auto p-6">
      <Swiper
        spaceBetween={24}
        className="h-52"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Image
            src="/temp/banner1.png"
            alt="Banner 1"
            width={0}
            height={0}
            sizes="100"
            className="h-48 w-full rounded-xl object-cover shadow-md shadow-black/30"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/temp/banner2.png"
            alt="Banner 1"
            width={0}
            height={0}
            sizes="100"
            className="h-48 w-full rounded-xl object-cover shadow-md shadow-black/30"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
