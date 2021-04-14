// import { Navbar, NavLink } from "react-bootstrap"
import { FaPlaneDeparture,BsArrowRight} from 'react-icons/all'
import { useState,forwardRef, useEffect } from 'react';
// import DatePicker from 'react-date-picker';
import './home.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router';
import FlightCard from '../flight/flight';
import Loading from '../loading/loading';
const Home = ({ userData}) => {
    const [IsLoading,setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [amount, setAmount] = useState()
    const [noAmount, setNoAmount] = useState(false)
    const [flightsData, setFlightData] = useState(null);
    const [fromNotSelected, setFromNotSelected] = useState(false);
    const [locationSelection, setLocationSelection] = useState({
        from: '',
        to: ''
    })
    const [selectOptions, setSelectOptions] = useState({
        from: [],
        to:[]
    })
    useEffect(async () => {
        await fetch('https://python-flask-api-trip.herokuapp.com/flightsLocationOption')
            .then((res) => res.json())
            .then((data) => {
                setSelectOptions(data);
            })
    },[]);
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
            setNoAmount(true);
        } else {
            if (locationSelection.from != '') {
                setNoAmount(false);
                setIsLoading(true);
                await fetch(`https://python-flask-api-trip.herokuapp.com/flightQuery/${amount}/${year}/${month}/${day}/${locationSelection.from}/${locationSelection.to}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setFlightData(data);
                        setIsLoading(false);
                    })
                setFromNotSelected(false);
            } else {
                setFromNotSelected(true);
            }
        }
    };
    const LocationChanged = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if (value != 'From') {
            setLocationSelection((preve) => {
                return {
                    ...preve,
                    [name]: value === 'To'?(''):(value)
                }
            })
            return
        }
        setFromNotSelected(false);
        
    }
    return (
        <>
            
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
                                <input type="number" className="form-control" id="floatingInput" placeholder="amount" value={amount} onChange={(e) => { setAmount(e.target.value); setNoAmount(false);}} />
                                <label htmlFor="floatingInput">Amount Rs</label>
                            </div>
                        </div>
                    </div>
                    {noAmount ? <div style={{ color: 'red' }}>pls provide the amount</div> : null}
                    <div className='select-options'>
                        
                        {
                            selectOptions ? (
                                <>
                                    <select class="form-select" aria-label="Default select" onChange={LocationChanged} name='from' value={locationSelection.from}>
                                        <option selected>From</option>
                                        {
                                            selectOptions.from.map((option) => {
                                                return <option key={option} value={option}>{option}</option>
                                            })
                                        }
                                       
                                    </select>
                                    <BsArrowRight style={{ fontSize: "25px", width: "100px" }} />
                                    <select class="form-select" aria-label="Default select" onChange={LocationChanged} name="to" value={locationSelection.to}>
                                        <option selected>To</option>
                                        {
                                            selectOptions.to.map((option) => {
                                                return <option key={option} value={option}>{option}</option>
                                            })
                                        }
                                    </select>
                                </>
                            ) : (
                                <div>Loading...</div>
                            )
                        }
                    </div>
                        {fromNotSelected ? <div style={{ color: 'red' }}>Select the correct value</div> : null}
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
                                            <FlightCard flight={flight} userData={userData} />
                                        )
                                    })
                                ) : (
                                    <div>no flight found</div>
                                )
                        
                            }
                        </div>
                    </div>
                ) : (
                    <div style={{ position: 'relative', height: '100%', display: IsLoading ? ('') : ('none') }}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
};

export default Home