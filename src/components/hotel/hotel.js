import { FaHotel, ImLocation2, BiRupee } from 'react-icons/all'
import { useContext, useEffect } from 'react'
import {UserContext} from '../../context/context'
import { Redirect } from 'react-router';
const Hotel = ({ hotel, userData }) => {
    // const [userPresent, setuserPresent] = useState(true);

    const [userPresent, setuserPresent] = useContext(UserContext).user;
    useEffect(() => {
        setuserPresent(true);
    }, []);
    const hotelSelected = (hotelId) => {
        if (!userData) {
            setuserPresent(false);
        } else {
            //(hotelId);
            fetch('https://python-flask-api-trip.herokuapp.com/addHotels',
          {
            method: 'POST',
            body: JSON.stringify({
              uid: userData.uid,
              hotelId
            }),
            mode: 'cors'
                }).then((res) => res.json())
                .then((data) => {
                //(data);
                    setuserPresent(true);
                })
        }
    }
    return (
        <div className="hotel-card">
            {userPresent?null:<Redirect to="/register"/>}
            <div className="hotel-image" style={{ background: `url(${hotel.image})`, height: '200px', width: '200px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '20px 0px 0px 20px' }}></div>
            <div className="hotel-info">
                <div className="hotel-title">
                    {hotel.name}
                    <div className="hotel-location">
                       <ImLocation2 style={{marginRight:'3px',color:'blue'}}/> {hotel.Location}
                    </div>
                </div>
                <div className="hotel-description">
                    {hotel.description}
                </div>
                <div className="hotel-price-and-bth">
                    <div className="hotel-price">
                        {hotel.price} <BiRupee />
                    </div>
                    <div className="hotel-bth" onClick={()=>{hotelSelected(hotel.id)}}>
                        Book Hotel <FaHotel style={{marginLeft:'4px'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hotel