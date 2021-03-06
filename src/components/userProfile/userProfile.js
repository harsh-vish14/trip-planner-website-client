import { useEffect, useState } from "react"
import { BiRupee,ImLocation2,BsArrowRight } from 'react-icons/all'
import NumberFormat from 'react-number-format'
import StripeCheckout from 'react-stripe-checkout'
import Loading from "../loading/loading"
import './userProfile.css'
const User = ({match}) => {
    const {
        params: { id }
    } = match
    const [userDetails, setUserDetails] = useState(null)
    var [finalAmount,setFinalAmount] = useState(0);
    useEffect(async () => {
        
        await fetch(`https://python-flask-api-trip.herokuapp.com/user/${process.env.REACT_APP_AUTH_KEY}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                //(data.amount);
                setFinalAmount(data.amount)
                setUserDetails(data.Data);
                
        })
    }, [])
    
    const deleteThisData = async (elementId, fieldName) => {
        //(elementId, fieldName);
        const selectArray = userDetails[`${fieldName}`]
        var filterArrays = selectArray.filter((element) => {
            if (element.id != elementId) {
                return element
            } else {
                setFinalAmount(finalAmount - element.price)
            }
        })
        setUserDetails((preve) => {
            return {
                ...preve,
                [fieldName]: filterArrays
            }
        })
        await fetch(`https://python-flask-api-trip.herokuapp.com/updateUserFields/${process.env.REACT_APP_AUTH_KEY}/remove`,
        {
                method: 'POST',
                body: JSON.stringify({
                    uid: id,
                    fieldName,
                    id: elementId
                }),
                mode: 'cors'
            })
            .then((res) => res.json())
            .then((data) => {
                //(data);
            })
    };
    const onToken = async(token)=>{
        //('payment is done')
        //(token)
        await fetch(`https://python-flask-api-trip.herokuapp.com/paymentDone`,
        {
                method: 'POST',
                body: JSON.stringify({
                    uid: id,
                    token
                }),
                mode: 'cors'
            })
            .then((res) => res.json())
            .then((data) => {
                //(data);
                setFinalAmount(0);
                setUserDetails((preve) => {
            return {
                ...preve,
                flights: [],
                hotels: [],
                packages: []
            }
        })
            })
    }
    return (
        <>
            {
                userDetails ? (
                    <>
                        <div className='user-profile'>
                            <div className='user-details'>
                                <div className='user-image' style={{ background: `url(${userDetails.userPhoto})`, height: '50px', width: '50px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', borderRadius: '10px' }}></div>
                                <div className='user-info'>
                                    <div className="user-name">
                                        {userDetails.name}
                                    </div>
                                    <div className='user-email'>
                                        {userDetails.email}
                                    </div>
                                    <div className='Total-amount' style={{ fontSize: '25px', fontWeight: '500', color: 'green', display: 'flex', alignItems: 'center' }}>
                                        Total Amount: <NumberFormat value={finalAmount} displayType={'text'} thousandSeparator={true} /> <BiRupee />
                                        <StripeCheckout
                                            token={onToken}
                                            currency='In'
                                            amount={finalAmount * 100}
                                            stripeKey='pk_test_51HblxaFatY2lMDlS0BbqxLb773qgMENPTmcfIY8uqlnkUPKDdWMyZket60szkecmhqfycOJ5toKUg7OTHjoWENZa000SG3Ynda'
                                            name='Trip Planner Website'
                                            
                                            style={{ marginRight: '20px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='user-item-selected'>
                                <div className='flight-data'>
                                    {
                                        userDetails.flights.length > 0 ? (
                                            <>

                                                <div className='title'>
                                                    Flights Selected
                                    </div>
                                                <div className='cards'>
                                                    {
                                                        userDetails.flights.map((flight) => {
                                                                            
                                                            return (
                                                                <div className='flight-details' key={flight.id}>
                                                                    <div style={{ background: `url(${flight.image})`, height: '200px', width: '200px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '20px' }}></div>
                                                                    <div className="flights-info">
                                                                        <div className="flight-name">
                                                                            {flight.name}
                                                                        </div>
                                                                        <div className='flight-locations'> <div><ImLocation2 style={{color:'blue'}}/> {flight.from}</div> <BsArrowRight style={{transform:'rotateZ(90deg)'}}/> <div><ImLocation2 style={{color:'blue'}}/>{flight.to}</div></div>
                                                                        <div className="flight-price">
                                                                            <NumberFormat value={flight.price} displayType={'text'} thousandSeparator={true} />
                                                                            <BiRupee />
                                                                            
                                                                        </div>
                                                                        <div className='remove-flight' onClick={() => { deleteThisData(flight.id, 'flights') }}>
                                                                            Remove Flight
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                                <div className='hotel-data'>
                                    {
                                        userDetails.hotels.length > 0 ? (
                                            <>
                                                <div className='title'>
                                                    Hotels Selected
                                    </div>
                                                <div className='cards'>
                                                    {
                                                        userDetails.hotels.map((hotel) => {
                                                                            
                                                            return (
                                                                <div className='flight-details' key={hotel.id}>
                                                                    <div style={{ background: `url(${hotel.image})`, height: '200px', width: '200px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '20px' }}></div>
                                                                    <div className="flights-info">
                                                                        <div className="flight-name">
                                                                            {hotel.name}
                                                                        </div>
                                                                        <div className="flight-price">
                                                                            <NumberFormat value={hotel.price} displayType={'text'} thousandSeparator={true} /> <BiRupee />
                                                                        </div>
                                                                        <div className='remove-flight' onClick={() => { deleteThisData(hotel.id, 'hotels') }}>
                                                                            Remove Hotel
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                            
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                                <div className='packages-data'>
                                    {
                                        userDetails.packages.length > 0 ? (
                                            <>

                                                <div className='title'>
                                                    Packages Selected
                                    </div>
                                                <div className='cards'>
                                                    {
                                                        userDetails.packages.map((packageSelected) => {
                                                            
                                                            return (
                                                                <div className='flight-details' key={packageSelected.id}>
                                                                    <div style={{ background: `url(${packageSelected.images[0]})`, height: '200px', width: '200px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '20px' }}></div>
                                                                    <div className="flights-info">
                                                                        <div className="flight-name">
                                                                            {packageSelected.name}
                                                                        </div>
                                                                        <div className="flight-price">
                                                                            
                                                                            <NumberFormat value={packageSelected.price} displayType={'text'} thousandSeparator={true} /> <BiRupee />
                                                                        </div>
                                                                        <div className='remove-flight' onClick={() => { deleteThisData(packageSelected.id, 'packages') }}>
                                                                            Remove Package
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                        <Loading />
                )
            }
            {/* {//(finalAmount)} */}
        </>
    );
}

export default User