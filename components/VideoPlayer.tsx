"use client";

import React ,{ useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { RxSpeakerLoud } from "react-icons/rx";
import { GrForwardTen } from "react-icons/gr";
import { GrBackTen } from "react-icons/gr"; 
import { RxTrackNext } from "react-icons/rx";
import { BsChatRightText } from "react-icons/bs";
import { SiSpeedtest } from "react-icons/si";
import { BsFullscreen } from 'react-icons/bs';
import { set } from "react-hook-form";
import { RxDotFilled } from "react-icons/rx";
import { TbCircleDot } from 'react-icons/tb';

type VideoRefType = React.RefObject<HTMLVideoElement>;
type RangeRefType = React.RefObject<HTMLInputElement>;

const VideoPlayer = () => {

    const videoRef: VideoRefType = useRef<HTMLVideoElement>(null);
    const volumeRef: RangeRefType = useRef<HTMLInputElement>(null);
    const progressRef: RangeRefType = useRef<HTMLInputElement>(null);

    const [volume, setVolume] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<Boolean>(true);
    const [soundContollerVisible, setSoundControllerVisible] = useState<Boolean>(false);
    const [playbackSpeedControlsVisible, setPlaybackSpeedControlsVisible] = useState<Boolean>(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {

      const updateVolume = () => {
        if (videoRef.current?.volume) {
          const volume = videoRef.current.volume;
          setVolume(volume);
        }
      }

      const updateProgress = () => {
        if (videoRef.current) {
          const currentTime = videoRef.current.currentTime;
          setProgress(currentTime);
        }
      };

      const updateVideoPlayingState = () => {
        if (videoRef.current) {
          videoRef.current?.play();
          setIsPlaying(true);
        }
      };

      updateVolume();
     
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.addEventListener("timeupdate", updateProgress);
        videoElement.addEventListener("loadedmetadata", updateVideoPlayingState);
      }

      return () => {
        if (videoElement) {
          videoElement.removeEventListener("timeupdate", updateProgress);
          videoElement.removeEventListener("loadedmetadata", updateVideoPlayingState);
        }
      }

      
    }, []);

    const handleRangeChange = () => {
      if (volumeRef.current) {
        const newVolume = parseFloat(volumeRef.current.value);
        setVolume(newVolume);

        if (videoRef.current) {
          videoRef.current.volume = newVolume;
        }
      }
    }

    const handleProgressChange = () => {
      if (progressRef.current) {
        const newProgress = parseFloat(progressRef.current.value);
        setProgress(newProgress);

        if (videoRef.current) {
          videoRef.current.currentTime = newProgress;
        }
      } 
    }

    const handlePlaybackSpeed = (value: number) => {
      const newPlaybackSpeed = value;
      setPlaybackSpeed(newPlaybackSpeed);

      if (videoRef.current) {
        videoRef.current.playbackRate = newPlaybackSpeed;
      }
    }

    const handleForwardTen = () => {
      if (videoRef.current) {
        videoRef.current.currentTime += 10;
      }
    }

    const handleBackTen = () => {
      if (videoRef.current) {
        videoRef.current.currentTime -= 10;
      }
    }
    
    const handlePlayAndPause = () => {
      
      if (videoRef.current) {
        
        if (videoRef.current.paused) {
          setIsPlaying(true);
          videoRef.current.play();
        } else {
          setIsPlaying(false);
          videoRef.current.pause();
        }
        
      }
    }

    const ToggleFullScreen = () => {
      
      const videoElement = videoRef.current;
      
      if (!document.fullscreenElement) {
        if (videoElement?.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if (videoElement?.mozRequestFullScreen) { // Firefox
          videoElement.mozRequestFullScreen();
        } else if (videoElement?.webkitRequestFullscreen) { // Chrome, Safari, Opera
          videoElement.webkitRequestFullscreen();
        } else if (videoElement?.msRequestFullscreen) { // IE/Edge
          videoElement.msRequestFullscreen();
        }

        setIsFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen();
        }
        setIsFullScreen(false);
      }

    }

  return (
    <div className='text-white w-full h-full relative'>
      
      <video 
      onClick={() => handlePlayAndPause()}
      ref={videoRef}
      autoPlay
      src="/sample.mp4"
      controls={false}
      className="w-screen h-screen"
      />

      <div 
      className="absolute z-1 bottom-10 text-white left-0 right-0">
        {/* <Slider 
        min={0}
        max={100}
        value={progress}
        handleStyle={{
            backgroundColor: 'yellow',
            borderColor: 'yellow',
        }}
        trackStyle={{
            backgroundColor: "red",
        }}
        className="bg-red-500 h-[3.5px] w-full hover:h-[6px] duration-200 transition-height"
    /> */}

    {/* Playback Speed Contorls */}
    <div 
    onMouseEnter={() => setPlaybackSpeedControlsVisible(true)}
    onMouseLeave={() => setPlaybackSpeedControlsVisible(false)}
    className={`absolute pb-4 right-0 bottom-10 h-[250px] w-[700px] ${playbackSpeedControlsVisible ? "flex items-center justify-center": "hidden"}`}
    >
      <div className="w-full bg-neutral-800 h-[220px] py-4 px-3 flex flex-col gap-y-2 relative">
        
        <div className="text-white font-bold text-[35px]">
          Playback Speed
        </div>

        <div className="flex-1 px-2 mt-12 relative flex flex-col">
          <div className="h-[1.5px] bg-white mx-4"/>
          <div className="flex items-center gap-[105px] absolute top-[-19px] right-0 left-0">
            <div 
            onClick={() => handlePlaybackSpeed(0.25)}
            className="items-center flex flex-col">
            {
              playbackSpeed === 0.25 ? (
                <TbCircleDot size={40} />
              ) : (
                <RxDotFilled size={40}/>
              )
            }
            <p className="font-semibold">0.25x</p>
            </div>
            <div 
            onClick={() => handlePlaybackSpeed(0.50)}
            className="items-center flex flex-col">
             {
              playbackSpeed === 0.50 ? (
                <TbCircleDot size={40} />
              ) : (
                <RxDotFilled size={40}/>
              )
            }
            <p className="font-semibold">0.5x</p>
            </div>
            <div 
            onClick={() => handlePlaybackSpeed(1)}
            className="items-center flex flex-col">
             {
              playbackSpeed === 1 ? (
                <TbCircleDot size={40} />
              ) : (
                <RxDotFilled size={40}/>
              )
            }
            <p className="font-semibold">1x (Normal)</p>
            </div>
            <div 
            onClick={() => handlePlaybackSpeed(1.75)}
            className="items-center flex flex-col">
             {
              playbackSpeed === 1.75 ? (
                <TbCircleDot size={40} />
              ) : (
                <RxDotFilled size={40}/>
              )
            }
            <p className="font-semibold">1.5x</p>
            </div>
            <div
            onClick={() => handlePlaybackSpeed(2)} 
            className="items-center flex flex-col">
             {
              playbackSpeed === 2 ? (
                <TbCircleDot size={40} />
              ) : (
                <RxDotFilled size={40}/>
              )
            }
            <p className="font-semibold">2.0x</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Sound contols */}
    <div 
    onMouseEnter={() => setSoundControllerVisible(true)}
    onMouseLeave={() => setSoundControllerVisible(false)}
    className="absolute bottom-10 flex items-center justify-center pb-4 left-[212px]">
    <div
    className={`h-[150px] w-[40px] ${soundContollerVisible ? "flex items-center justify-center" : "hidden"} bg-black`}>
    <input  
    type="range" 
    ref={volumeRef}
    max={1}
    min={0}
    step={0.001}
    value={volume}
    onChange={handleRangeChange}
    className="h-1 -rotate-90 appearance-none bg-red-500"
    />
    </div>
    </div>

    <div className="w-full h-[100px] flex flex-col items-center gap-4">
      
      {/* Seekbar */}
      <div className="w-full flex items-center px-3 gap-3">    
      
      <input 
    type="range" 
    ref={progressRef}
    max={videoRef.current?.duration || 0}
    min={0}
    step={0.01}
    value={progress}
    onChange={handleProgressChange}
    className="flex-1 h-1 hover:h-[6px] transition-height duration-200 bg-red-500 appearance-none" 
    />

    <p className="text-[12px]">{videoRef.current?.duration}</p>
      
      </div>
      
      {/* Controls */}
      <div className="w-full flex px-6 justify-between mt-7">
        
        <div className="flex gap-7 items-center">
          
          {
            isPlaying && (
              <GiPauseButton 
              onClick={() => handlePlayAndPause()}
              className="text-[36px] hover:scale-125 transition-scale duration-200"/>
            )
          }
          {
            !isPlaying && (
              <FaPlay 
              onClick={() => handlePlayAndPause()}
              className="text-[36px] hover:scale-125 transition-scale duration-200"/>
            )
          }

          <GrBackTen
          onClick={() => handleBackTen()}
          className="text-[36px] hover:scale-125 transition-scale duration-200 bg-white rounded-full p-[3px]"/>
          <GrForwardTen 
          onClick={() => handleForwardTen()}
          className="text-[36px] hover:scale-125 transition-scale duration-200 bg-white rounded-full p-[3px]"/>
          <RxSpeakerLoud
          onMouseEnter={() => setSoundControllerVisible(true)}
          onMouseLeave={() => setSoundControllerVisible(false)}
          className="text-[36px] hover:scale-125 transition-scale duration-200"/>
        </div>

        <div 
        className="text-[20px] truncate max-w-[400px] text-center">
          SpiderMan: No Way Home
        </div>

        <div className="flex items-center gap-7">
         <RxTrackNext className="text-[36px] hover:scale-125 transition-scale duration-300"/>
         <BsChatRightText className="text-[36px] hover:scale-125 transition-scale duration-300"/>
         <SiSpeedtest 
         onMouseEnter={() => setPlaybackSpeedControlsVisible(true)}
         onMouseLeave={() => setPlaybackSpeedControlsVisible(false)}
         className="text-[36px] hover:scale-125 transition-scale duration-300"/>
         <BsFullscreen 
         onClick={ToggleFullScreen}
         className="text-[36px] hover:scale-125 transition-scale duration-300"/>
        </div>

      </div>

    </div>
   
    {/* <input 
    type="range" 
    ref={volumeRef}
    max={1}
    min={0}
    step={0.001}
    value={volume}
    onChange={handleRangeChange}
    className="h-1"
    />
    <input 
    type="range"
    max={2}
    min={0.5}
    step={0.1}
    value={playbackSpeed}
    onChange={handlePlaybackSpeed}
    className="h-1"
    />
   */}
      </div>


    </div>
  )
}

export default VideoPlayer
