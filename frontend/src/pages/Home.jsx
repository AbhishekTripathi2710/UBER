import React, {  useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import LocationSearchPanel from '../components/locationSearchPanel';
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null)
    const panelClose = useRef(null);
    const vehiclePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare,setFare] = useState({})
    const [vehicleType,setVehicleType] = useState(null);
    const [ride, setRide] = useState(null)
    const navigate = useNavigate();

    const {socket} = useContext(SocketContext)
    const {user} = useContext(UserDataContext);
   
    useEffect(()=>{
       socket.emit('join',{userType:'user',userId:user._id})
    }, [user])

    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride=>{
        setWaitingForDriver(false);
        navigate('/riding',{state: {ride}})
    })

    const submitHandler = (e) => {
        e.preventDefault();
    }

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch{
            
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelClose.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelClose.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanelOpen) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [vehiclePanelOpen]);

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [waitingForDriver])

    async function findTrip() {
        setVehiclePanelOpen(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        setFare(response.data)
    }

    async function createRide(){
        const response =  await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
            pickup,
            destination,
            vehicleType
        }, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
    }

    return (
        <div className="h-screen relative overflow-hidden">
            <img onClick={() => {
                navigate('/user/logout')
            }} className="w-16 z-20  absolute left-5 top-20" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            <div onClick={() => {
                setVehiclePanelOpen(false)
            }}
                className="h-screen w-screen">
                {/* Image for temporary use */}
                <LiveTracking></LiveTracking>
            </div>
            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[35%] p-6 bg-white relative">
                    <h5
                        ref={panelClose}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                        className="opacity-0 absolute top-10 right-6 text-2xl"><i className="ri-arrow-down-s-line"></i></h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[45%] left-10 bg-black rounded-full "></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5" type="text" placeholder="Add a pick-up location"></input>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3" type="text" placeholder="Enter your destination"></input>
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className=" bg-white h-0 ">
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanelOpen={setVehiclePanelOpen}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}></LocationSearchPanel>
                </div>
            </div>
            <div ref={vehiclePanelRef} className="bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-10 pt-12">
                <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}></VehiclePanel>
            </div>
            <div ref={confirmRidePanelRef} className="bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 pt-12">
                <ConfirmRide
                 pickup={pickup}
                  destination={destination} 
                  fare={fare} 
                  vehicleType={vehicleType}
                  createRide={createRide} 
                  setVehicleFound={setVehicleFound} 
                  setConfirmRidePanel={setConfirmRidePanel} ></ConfirmRide>
            </div>
            <div ref={vehicleFoundRef} className="bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 pt-12">
                <LookingForDriver
                  pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} createRide={createRide}
                 setVehicleFound={setVehicleFound}></LookingForDriver>
            </div>
            <div ref={waitingForDriverRef} className="bg-white w-full fixed z-10 bottom-0 px-3 py-6 pt-12">
                <WaitingForDriver 
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}></WaitingForDriver>
            </div>
        </div>
    )
}

export default Home;