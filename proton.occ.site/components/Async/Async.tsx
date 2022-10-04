import { FC } from "react";
import s from "./Async.module.scss";
import Iframe from 'react-iframe'


const Async:FC = () => {
    return (<div className={s.container}>
<Iframe url="https://app.async.network"
        width="1300"
        height="720"
    
        id=""
        className=""
        display="block"
        position="relative"/>
    
    </div>)
}

export default Async;