import React from "react";
import s from "./Banner2.module.scss";
import Image from "next/image";

const Banner2 = () => {
  return (
    <div className={s.container}>
      <div className={s.github}>
      <a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xD17549214EE159A81F4EABa94c3B01118191c675">
      <button className={s.button}>
      The-proton-project @github
      </button>
      </a>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=permissionles&repo=project-proton&type=follow&count=true&size=large"
          // frameborder="0"
          scrolling="0"
          width="230"
          height="30"
          title="GitHub"
        ></iframe>
    
      </div>
      <div className={s.imgWrapper}>
        <Image
          src="/images/banner2content.svg"
          alt="proton"
          objectFit="contain"
          width={1450}
          height={612}
        />
      </div>
    </div>
  );
};

export default Banner2;
