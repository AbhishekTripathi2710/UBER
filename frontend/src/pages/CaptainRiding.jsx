import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link , useLocation} from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {

    const [finishRidePanel, setFininshRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride

    useGSAP(function(){
        if(finishRidePanel){
            gsap.to(finishRidePanelRef.current,{
                transform:'translateY(0)'
            })
        }else{
            gsap.to(finishRidePanelRef.current,{
                transform:'translateY(100%)'
            })
        }

    },[finishRidePanel])


    return (
        <div className="h-screen relative flex flex-col justify-end">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
                <Link to='/captain-home' className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-bold ri-logout-box-line"></i>
                </Link>
            </div>
            <div className="h-1/5 p-6 flex items-center justify-between relative  bg-yellow-400"
            onClick={()=>{
                setFininshRidePanel(true);
            }}>
                <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={() => {

                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <h4 className="text-xl font-semibold">4 Km away</h4>
                <button className="w-full mt-5 flex justify-center bg-green-600 text-white p-2 rounded font-semibold">Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full h-screen  bg-white px-3 py-10 pt-12">
                <FinishRide
                    ride={rideData}
                    setFininshRidePanel={setFininshRidePanel}></FinishRide>
            </div>
            <div className="h-screen w-screen fixed top-0  z-[-1]">
                <LiveTracking></LiveTracking>
            </div>
        </div>
    )
}

export default CaptainRiding;