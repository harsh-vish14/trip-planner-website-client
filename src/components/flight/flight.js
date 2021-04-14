import { BiRupee, ImLocation2, BsArrowRight } from 'react-icons/all'
import { Redirect } from 'react-router';
import { useContext, useEffect } from 'react'
import {UserContext} from '../../context/context'
import DateConverter from '../../functions/DateConvertor'
const FlightCard = ({ flight, userData }) => {
    const [userPresent, setuserPresent] = useContext(UserContext).user;
    useEffect(() => {
        setuserPresent(true);
    },[])
    const flightSelected = (flightId) => {
        if (!userData) {
            //('user not logged in')
            setuserPresent(false);
        } else {
            //(flightId);
            fetch('https://python-flask-api-trip.herokuapp.com/addFlight',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        uid: userData.uid,
                        flightId
                    }),
                    mode: 'cors'
                }).then((res) => res.json())
                .then((data) => {
                    //(data);
                    setuserPresent(true);
                })
        }
    };
    return (
        <div className='flight' key={flight.id}>
            {userPresent?null:<Redirect to="/register"/>}
            <div className='flight-image' style={{ background: `url(${flight.image})`, height: '200px', width: '200px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', borderRadius: '20px' }}></div>
            <div className='flight-info'>
                <div className='flight-name'>{flight.name} <div className='flight-locations'> <ImLocation2 style={{color:'blue'}}/> {flight.from} <BsArrowRight style={{width: "100px" }} /> <ImLocation2 style={{color:'blue'}}/>{flight.to}</div></div>
                <div className='flight-detail'>
                    {flight.description}
                </div>
                <div className='flight-date'>
                    {DateConverter(flight.day, flight.month, flight.year)}
                </div>
                <div className='flight-price'>
                    {flight.price} <BiRupee />
                    <div className='flight-booking' onClick={() => { flightSelected(flight.id) }}>
                        Book flight
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FlightCard