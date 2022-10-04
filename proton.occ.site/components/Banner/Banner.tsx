import Image from "next/image";
import { useRef } from "react";
import s from "./Banner.module.scss";

const Banner = () => {
  const audioRef = useRef<any>(null);
  const reaveal = () => {
    document.body.classList.add("page-loaded");
  };

  const audioControl = () => {
    if (!audioRef.current) {
      return;
    }
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div
      className={`${s.container}`}
      onClick={() => {
        reaveal();
        // audioControl();
      }}
    >
      <audio ref={audioRef} id="audio" src="/bgMusic.mp3"></audio>
      <div className={s.banner}>
        <div className={s.imageWrapper}></div>
        <div className={s.bannerContent}>
          <Image
            src="/images/bannerText2.png"
            alt="proton"
            objectFit="contain"
            width={700}
            height={230}
          />
          <div className={s.content}>
            <span className={s.footerText}>an on-chain corporation by</span>
            <Image
              src="/images/prmsnlsLogo.png"
              alt="proton"
              objectFit="contain"
              width={120}
              height={40}
            />
          </div>
        </div>
        <div className={s.volume} onClick={audioControl}>
          <Image
            src="/images/play.png"
            alt="proton"
            objectFit="contain"
            width={70}
            height={70}
          />
          <audio ref={audioRef} id="audio" src="/bgMusic.mp3"></audio>
        </div>
      </div>
    </div>
  );
};

export default Banner;
