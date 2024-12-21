import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
    const location = useLocation();
    const {ride} = location.state || {};
    const {socket} = useContext(SocketContext);
    const navigate = useNavigate();
    
    socket.on('ride-ended',()=>{
        navigate('/home')
    })

    return (
        <div className="h-screen">
            <Link to='/home' className="right-2 top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full">
                 <i className="text-lg font-bold ri-home-4-fill"></i>
            </Link>
            <div className="h-1/2">
            <LiveTracking></LiveTracking>
            </div>
            <div className="h-1/2 p-4">
                <div className="flex items-center justify-between">
                    <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png" alt="" />
                    <div className="text-right">
                        <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
                        <p className="text-sm text-gray-600">G Wagon</p>
                    </div>
                </div>

                <div className="flex gap-2 justify-between items-center flex-col">
                    <div className="w-full mt-5">
                        <div className="flex items-center gap-5 p-3 border-b-2">
                            <i className="text-lg ri-map-pin-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">Destination</h3>
                                <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-3">
                            <i className="ri-money-rupee-circle-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                                <p className="text-sm -mt-1 text-gray-600">Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full mt-5 bg-green-600 text-white p-2 rounded font-semibold">Make a payment</button>
            </div>
        </div>
    )
}

export default Riding;