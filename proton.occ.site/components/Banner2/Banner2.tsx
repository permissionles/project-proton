import React from "react";
import s from "./Banner2.module.scss";
import Image from "next/image";

const Banner2 = () => {
  return (
    <div className={s.container}>
      <div className={s.imgWrapper}>
        <Image
          src="/images/banner2content.png"
          alt="proton"
          objectFit="contain"
          width={950}
          height={612}
        />
      </div>
    </div>
  );
};

export default Banner2;
