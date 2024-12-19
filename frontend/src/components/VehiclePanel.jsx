import React from "react";


const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={() => {
                props.setVehiclePanelOpen(false);
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }}
             className="flex mb-2 border-2 active:border-black rounded-xl  p-3  w-full items-center justify-between">
                <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png"></img>
                <div className=" w-1/2">
                    <h4 className="font-medium text-large">UberGo <span><i className="ri-user-3-line"></i>4</span></h4>
                    <h5 className="font-medium text-sm">2 miles away</h5>
                    <p className="font-normal text-xs text-gray-600">Afforadble, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.selectVehicle('moto')
            }}
             className="flex mb-2 border-2 active:border-black rounded-xl  p-3  w-full items-center justify-between">
                <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"></img>
                <div className=" w-1/2">
                    <h4 className="font-medium text-large">Moto <span><i className="ri-user-3-line"></i>1</span></h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">Afforadble, motorcycle rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }}
            className="flex mb-2 border-2 active:border-black rounded-xl  p-3  w-full items-center justify-between">
                <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"></img>
                <div className=" w-1/2">
                    <h4 className="font-medium text-large">UberAuto <span><i className="ri-user-3-line"></i>3</span></h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">Afforadble, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel;