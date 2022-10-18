import Image from "next/image";
import { FC } from "react";
import s from "./BlueCard.module.scss";

interface Props {
  textLine1?: string;
  textLine2?: string;
  textLine3?: string;
  textLine4?: string;

  apr?: string;
  krlAmount?: string;
  type?: "big" | "small";
  claimButton?: boolean;
  itemIndex?: number;
  children?: any;
}

const BlueCard: FC<Props> = ({
  textLine1 = "",
  textLine2 = "",
  textLine3 = "",
  textLine4 = "",
  type = "big",
  apr = "",
  krlAmount = "",
  claimButton = false,
  itemIndex,
  children,
}) => {
  return (
    <>
      {type === "big" && (
        <div className={`${s.dataCardWrapper} `}>
          <div className={`${s.dataCard}`}>
            <div className={s.timePeriod}>
              <p className={`${s.num} f-lg `}>{textLine3}</p>
              {/* <div className={`${s.small}`}>Staked</div> */}
            </div>
            <div className={s.amount}>
              <p className={`${s.title} f-mija`}>
                {/* {apr} */}
                Stocked
                {krlAmount}
                Reward
              </p>
            </div>
            <div className={s.data}>
              <div className={s.stock}>
                {textLine3 && (
                  <p className={`${s.title} f-mija`}>
                    {textLine1}
                    <Image
                      src="/images/plogo.png"
                      objectFit="contain"
                      width={35}
                      height={35}
                    />
                  </p>
                )}
                <p className={s.reward}>
                  1300
                  <Image
                    src="/images/rewards.png"
                    objectFit="contain"
                    width={25}
                    height={20}
                  />
                </p>
              </div>
              <div className={s.reward}></div>
            </div>
            {/* {textLine4 && <p className={`${s.title} f-mija`}>{textLine4}</p>} */}
            <div className={s.aprAmount}>
              <p className={`${s.title} f-mija`}>{apr}</p>
              <p className={s.approxIcon}>
                <Image
                  src={"/images/approx.png"}
                  alt="approximately sign"
                  // layout="fill"
                  width={26}
                  height={40}
                />
              </p>
              <p> {krlAmount}</p>
            </div>

            {children}
          </div>
        </div>
      )}
      {type === "small" && (
        <div className={`${s.dataCardWrapper} ${s.small}`}>
          <div className={`${s.dataCard}`}>
            <p className={`${s.title} f-mija`}>{textLine2}</p>
            <p className={`${s.num} f-lg `}>{textLine3}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BlueCard;
