import { FC } from "react";
import s from "./StackToken.module.scss";

const StackToken: FC = () => {
  return (
    <div className={s.container}>
      <div className="btn-prt">Stock $PRTN</div>
      <div className={`btn-prt btn-prt--bordered ${s.withdraw}`}>Withdraw</div>
    </div>
  );
};

export default StackToken;
