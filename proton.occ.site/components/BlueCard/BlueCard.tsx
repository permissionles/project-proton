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
  // children,
}) => {
  return (
    <>
      {type === "big" && (
        <div className={`${s.dataCardWrapper} `}>
          <div className={`${s.dataCard}`}>
            <div>
              <p className={`${s.num} f-lg `}>{textLine1}</p>
              <div className={`${s.small}`}>STAKED</div>
              <p className={`${s.title} f-mija`}>
                {apr}
                <span className={s.approxIcon}>
                  <Image
                    src={"/images/approx.png"}
                    alt="approximately sign"
                    // layout="fill"
                    width={16}
                    height={20}
                  />
                </span>
                {krlAmount}
              </p>
              {textLine3 && <p className={`${s.title} f-mija`}>{textLine3}</p>}
              {textLine4 && <p className={`${s.title} f-mija`}>{textLine4}</p>}
            </div>

            {/* {children} */}
          </div>
        </div>
      )}
      {type === "small" && (
        <div className={`${s.dataCardWrapper} ${s.small}`}>
          <div className={`${s.dataCard}`}>
            <p className={`${s.title} f-mija`}>{textLine1}</p>
            <p className={`${s.title} f-mija`}>{textLine2}</p>
            <p className={`${s.num} f-lg `}>{textLine3}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BlueCard;
