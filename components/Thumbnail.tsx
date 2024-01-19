"use client"

import { BsFillPlayCircleFill } from "react-icons/bs"
import { BsCheckCircle } from "react-icons/bs"
import { BiLike } from "react-icons/bi"
import { TfiArrowCircleDown } from "react-icons/tfi"
import { TbPointFilled } from "react-icons/tb"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"

type VideoRefType = React.RefObject<HTMLVideoElement>;

const Thumbnail = () => {

    const videoRef: VideoRefType = useRef<HTMLVideoElement>(null);
    const [hover, setHover] = useState<boolean>(false);
    const [videoVisible, setVideoVisible] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {

        let timeout: any;
        const videoElement = videoRef.current      

        if (hover) {            
           timeout = setTimeout(() => {
                setVideoVisible(true);

                if (videoElement) {
                    videoElement.currentTime = 0
                    videoElement.play();
                }

            }, 1200);
            
        }

        return () => {
            clearTimeout(timeout);
            setVideoVisible(false);

            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
           
        }

    }, [hover]);

  return (
    <div className="p-10">
        <div 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`w-[210px] h-auto hover:scale-125 transition-scale duration-700 group bg-black hover:w-[240px]`}>
       
        <img 
        src="/thumbnail.jpg" 
        alt="thumbnail" 
        className={`${videoVisible ? "hidden" : "object-cover"}`} />
       
        <video 
        src="/sample.mp4"
        autoPlay
        controls={false}
        ref={videoRef}
        className={`w-full ${videoVisible ? "flex" : "hidden"}`} />
       
        <div className="hidden items-center justify-between group-hover:flex mt-1 px-1">
            <div className="flex items-center gap-2 py-1">
                <div className="text-white/80 rounded hover:text-white">
                    <BsFillPlayCircleFill 
                    onClick={() => router.push("/watch/3748")}
                    size={28} 
                    className="object-cover"/>
                </div>
                <div className="text-white/80 bg-neutral rounded-full border-w-[0.4px] hover:text-white">
                    <BsCheckCircle size={28} className="object-cover"/>
                </div>
                <div className="text-white/80 bg-neutral rounded-full border-w-[0.4px] border-white">
                    <BiLike size={28} className="object-cover m-1"/>
                </div>
            </div>
            <div className="text-white/80 rounded hover:text-white">
                    <TfiArrowCircleDown size={28} className="object-cover"/>
            </div>
        </div>

        <div className="hidden group-hover:flex mt-1 px-1 pb-2">
                <div className="flex items-center gap-1">
                    <TbPointFilled size={10} className="text-white/80"/>
                    <p className="text-white/80 text-[12px]">Suspense</p>
                </div>
                <div className="flex items-center gap-1">
                    <TbPointFilled size={10} className="text-white/80"/>
                    <p className="text-white/80 text-[12px]">Slick</p>
                </div>
                <div className="flex items-center gap-1">
                    <TbPointFilled size={10} className="text-white/80"/>
                    <p className="text-white/80 text-[12px]">Thriller</p>
                </div>
        </div>

        </div>
    </div>
  )
}

export default Thumbnail
