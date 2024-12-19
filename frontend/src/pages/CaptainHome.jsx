import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePop from "../components/RidePop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePop from "../components/ConfirmRidePop";


const CaptainHome = () => {

    const [ridePopupPanel,setRidePopupPanel] = useState(true);
    const [confirmRidePopupPanel,setConfirmRidePopupPanel] = useState(false);
    const ridePopPanelRef = useRef(null);
    const confimRidePopPanelRef = useRef(null);


    useGSAP(function(){
        if(ridePopupPanel){
            gsap.to(ridePopPanelRef.current,{
                transform:'translateY(0)'
            })
        }else{
            gsap.to(ridePopPanelRef.current,{
                transform:'translateY(100%)'
            })
        }

    },[ridePopupPanel])

    useGSAP(function(){
        if(confirmRidePopupPanel){
            gsap.to(confimRidePopPanelRef.current,{
                transform:'translateY(0)'
            })
        }else{
            gsap.to(confimRidePopPanelRef.current,{
                transform:'translateY(100%)'
            })
        }

    },[confirmRidePopupPanel])

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
                <Link to='/captain/logout' className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-bold ri-logout-box-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"></img>
            </div>
            <div className="h-2/5 p-6">
                <CaptainDetails></CaptainDetails>
            </div>
            <div ref={ridePopPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12">
                <RidePop setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}></RidePop>
            </div>
            <div ref={confimRidePopPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full h-screen  bg-white px-3 py-10 pt-12">
                <ConfirmRidePop setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}></ConfirmRidePop>
            </div>
        </div>
    )
}

export default CaptainHome;