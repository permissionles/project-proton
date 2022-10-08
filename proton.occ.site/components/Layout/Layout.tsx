import { FC } from "react";
import s from "./Layout.module.scss";

interface Props {
  className?: string;
}
export const Layout: FC<Props> = ({ className }) => {
  return (
    <div className={`${s.container} ${className}`}>
      <main className={s.content}></main>
    </div>
  );
};

export default Layout;
