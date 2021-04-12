import {useState, useEffect}  from 'react'
import { FaHotel } from 'react-icons/all'
import { Redirect } from 'react-router';
import Hotel from '../hotel/hotel'
import Loading from '../loading/loading';
import './hotels.css'
const Hotels = ({ userData,userPresent,setUserPresent }) => {
    const [hotelsData, setHotelsData] = useState([]);
    const [search, setSearch] = useState('');
    const fetchData = async () => {
        await fetch('https://python-flask-api-trip.herokuapp.com/hotels')
            .then((res) => res.json())
            .then((data) => {
                setHotelsData(data);
                console.log(data)
            })
    };
    useEffect(() => {
        if (search === '') {
            fetchData()
        }
    },[]);
    const hotelsSearch = () => {
        console.log(search)
        if (hotelsData) {
            var filterHotel = hotelsData.filter((hotel) => hotel.name.toLowerCase().includes(search.toLocaleLowerCase()))
            console.log(filterHotel)
            setHotelsData(filterHotel)
        }
        if (search === '') {
            fetchData()
        }
    }
    const handleChanged = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            fetchData()
        }
    }
    return (
        <div className="hotels-page">
            {userPresent?(null):(<Redirect to="/register" />)}
            <div className="header">
                <div className="header-title">
                    Find best Hotel for your Vacation
                </div>
                <div className='search-bar'>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Hotel Name" autoComplete={false} onChange={handleChanged} />
                    <div className='search' onClick={hotelsSearch}>Filter Hotel <FaHotel style={{marginLeft:'10px'}}/></div>
                </div>
            </div>
            <div className='hotels-Title'>
                Hotels
            </div>
            <div className='hotels-element'>
                    {console.table(hotelsData)}
                {
                    hotelsData ? (
                        hotelsData.map((hotel) => {
                            console.log(hotel)
                            return (<Hotel hotel={hotel} key={hotel.id} userData={userData} setUserPresent={setUserPresent} /> )
                        })
                    ): (
                            <Loading/>
                    )
                }
                    
                </div>
        </div>
    )
};

export default Hotels