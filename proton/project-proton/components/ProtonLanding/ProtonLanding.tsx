import Image from "next/image";
import s from "./ProtonLanding.module.scss";

const ProtonLanding = () => {
  return (
    <div className={s.container}>
      <div className={s.banner}>
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
      </div>
    </div>
  );
};

export default ProtonLanding;
