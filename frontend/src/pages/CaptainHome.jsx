import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePop from "../components/RidePop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePop from "../components/ConfirmRidePop";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const ridePopPanelRef = useRef(null);
    const confimRidePopPanelRef = useRef(null);
    const [ride,setRide] = useState(null)

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    useEffect(() => {
        socket.emit('join', { userId: captain._id, userType: 'captain' });

        const updateLocations = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    console.log({
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude}
                        })
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocations, 10000)
        updateLocations();
        //return () =>clearInterval(locationInterval)
    }, [])

    socket.on('new-ride', (data) => {
        console.log(data);
        setRide(data)
        setRidePopupPanel(true)
    })

    async function confirmRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confimRidePopPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confimRidePopPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [confirmRidePopupPanel])

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
                <Link to='/captain/logout' className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-bold ri-logout-box-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                <LiveTracking></LiveTracking>
            </div>
            <div className="h-2/5 p-6">
                <CaptainDetails></CaptainDetails>
            </div>
            <div ref={ridePopPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12">
                <RidePop 
                ride = {ride}
                confirmRide = {confirmRide}
                setRidePopupPanel={setRidePopupPanel}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}></RidePop>
            </div>
            <div ref={confimRidePopPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full h-screen  bg-white px-3 py-10 pt-12">
                <ConfirmRidePop
                ride={ride}
                setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}></ConfirmRidePop>
            </div>
        </div>
    )
}

export default CaptainHome;