import React, {useContext} from "react";
import {CaptainDataContext} from '../context/CaptainContext'
import { useNavigate } from "react-router-dom";

const CaptainDetails = () => {
    const navigate= useNavigate();
    const { captain } = useContext(CaptainDataContext)
    return (
        <div>
            <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-3">
                        <img onClick={() => {
                            navigate('/captain/logout')
                        }} className="h-10 w-10 rounded-full object-cover" src="data:image/jpeg;base64,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"></img>
                        <h4 className="text-lg font-medium">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold">₹193.20</h4>
                        <p className="text-sm text-gray-600">Earned</p>
                    </div>
                </div>
                <div className="flex p-3 mt-8 bg-gray-100 rounded-xl  justify-center gap-5 items-start">
                    <div className="text-center">
                        <i className="text-3xl mb-3 font-thin ri-time-line"></i>
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>
                    </div>
                    <div className="text-center">
                        <i className="text-3xl mb-3 font-thin ri-speed-up-fill"></i>
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p  className="text-sm text-gray-600">Hours Online</p>
                    </div>
                    <div className="text-center">
                        <i className="text-3xl mb-3 font-thin ri-booklet-line"></i>
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p  className="text-sm text-gray-600">Hours Online</p>
                    </div>
                </div>
        </div>
    )
}


export default CaptainDetails;