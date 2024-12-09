import { Spin } from "antd";
import './index.css';

const LoadingWrapepr =({loading,children})=>{
    return(
        <>
        {
            loading?<div className="main_loading_container"><Spin size="large" /></div>:children
        }
        </>
    )
};
export default LoadingWrapepr;