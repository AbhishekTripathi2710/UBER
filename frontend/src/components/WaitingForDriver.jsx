import React from "react";


const WaitingForDriver = (props) => {
    return(
        <div>
            <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={() => {
                props.waitingForDriver(false);
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
            
            <div className="flex items-center justify-between">
            <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png" alt="" />
            <div className="text-right">
                <h2 className="text-lg font-medium capitalize">{props.ride?.captain.fullname.firstname}</h2>
                <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
                <p className="text-sm text-gray-600">G Wagon</p>
                <p className="text-lg font-semibold">OTP:- {props.ride?.otp}</p>
            </div>
            </div>

            <div className="flex gap-2 justify-between items-center flex-col">
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">PickUp</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">Destination</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                    <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver;