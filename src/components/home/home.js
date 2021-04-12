// import { Navbar, NavLink } from "react-bootstrap"
import { FaPlaneDeparture} from 'react-icons/all'
import { useState,forwardRef } from 'react';
// import DatePicker from 'react-date-picker';
import './home.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router';
import FlightCard from '../flight/flight';
import Loading from '../loading/loading';
const Home = ({ userData, userPresent, setUserPresent }) => {
    const [IsLoading,setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [amount, setAmount] = useState()
    const [noAmount, setNoAmount] = useState(false)
    const [flightsData, setFlightData] = useState(null);
    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
            <button className="example-custom-input" onClick={onClick} ref={ref}>
                {value}
            </button>
        ),
    );
    const filterFlight = async () => {
        const dateConvert = startDate.toLocaleDateString().split('/');
        const day = dateConvert[1];
        const month = dateConvert[0];
        const year = dateConvert[2];
        //(amount);
        if (amount === 0 || !amount) {
            //('no amomunt')
            setNoAmount(true);
        } else {
            setNoAmount(false);
            //('loading...');
            setIsLoading(true);
            await fetch(`https://python-flask-api-trip.herokuapp.com/flightQuery/${amount}/${year}/${month}/${day}`)
                .then((res) => res.json())
                .then((data) => {
                    setFlightData(data);
                    console.table(data);
                    //('...done Loading');
                    setIsLoading(false);
                })
        }
    };
    return (
        <>
            {userPresent?(null):(<Redirect to="/register" />)}
            <div className="home-component">
                <div className="header-content">
                    <div className="title">
                        The new way to plan your next trip
                </div>
                    <div className='content'>
                        Create a fully customized day by day itinerary for free
                </div>
                </div>
                <div className='flight-search'>
                    <div className='flight-search-input'>
                        <div className='date'>
                            <DatePicker
                                className='date-btn'
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                customInput={<ExampleCustomInput />}
                            />
                        </div>
                        <div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="floatingInput" placeholder="amount" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                                <label htmlFor="floatingInput">Amount Rs</label>
                            </div>
                        </div>
                    </div>
                    {noAmount ? <div style={{ color: 'red' }}>pls provide the amount</div> : null}
                    <div className='search-planes-btn' onClick={filterFlight}>
                        Search Flights <FaPlaneDeparture />
                    </div>
                </div>
            </div>
            {
                flightsData ? (
                    <div className='plains-details' id='flights'>
                        <div className='plains-details-title'>
                            Flight Searched <FaPlaneDeparture />
                        </div>
                        <div className='plains-details-flight'>
                            {
                         
                                flightsData.length > 0 ? (
                                    flightsData.map((flight) => {
                                        return (
                                            <FlightCard flight={flight} userData={userData} setUserPresent={setUserPresent} />
                                        )
                                    })
                                ) : (
                                    <div>no flight found</div>
                                )
                        
                            }
                        </div>
                    </div>
                ) : (
                        <div style={{position: 'relative',height: '100%', display: IsLoading?(''):('none')}}>
                    <Loading/>
                        </div>
                )
            }
        </>
    );
};

export default Home