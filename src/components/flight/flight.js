import { BiRupee } from 'react-icons/all'
import DateConverter from '../../functions/DateConvertor'
const FlightCard = ({ flight,userData,setUserPresent }) => {
    const flightSelected = (flightId) => {
        if (!userData) {
            console.log('user not logged in')
            setUserPresent(false);
        } else {
            console.log(flightId);
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
                console.log(data);
            })
        }
    }
    return (
        <div className='flight' key={flight.id}>
            <div className='flight-image' style={{ background: `url(${flight.image})`, height: '200px', width: '200px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', borderRadius: '20px' }}></div>
            <div className='flight-info'>
                <div className='flight-name'>{flight.name}</div>
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