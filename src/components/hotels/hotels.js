import {useState, useEffect}  from 'react'
import { FaHotel } from 'react-icons/all'
import { Redirect } from 'react-router';
import Hotel from '../hotel/hotel'
import Loading from '../loading/loading';
import './hotels.css'
const Hotels = ({ userData }) => {
    
    const [hotelsData, setHotelsData] = useState([]);
    const [search, setSearch] = useState('');
    const fetchData = async () => {
        await fetch('https://python-flask-api-trip.herokuapp.com/hotels')
            .then((res) => res.json())
            .then((data) => {
                setHotelsData(data);
                //(data)
            })
    };
    useEffect(() => {
        if (search === '') {
            fetchData()
        }
    },[]);
    const hotelsSearch = () => {
        //(search)
        if (hotelsData) {
            var filterHotel = hotelsData.filter((hotel) => hotel.name.toLowerCase().includes(search.toLocaleLowerCase()))
            //(filterHotel)
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
            
            <div className="header">
                <div className="header-title">
                    Find best Hotel for your Vacation
                </div>
                <div className='search-bar'>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Hotel Name" onChange={handleChanged} />
                    <div className='search' onClick={hotelsSearch}>Filter Hotel <FaHotel style={{marginLeft:'10px'}}/></div>
                </div>
            </div>
            <div className='hotels-Title'>
                Hotels
            </div>
            <div className='hotels-element'>
                    
                {
                    hotelsData.length > 0 ? (
                        hotelsData.map((hotel) => {
                            return (<Hotel hotel={hotel} key={hotel.id} userData={userData} /> )
                        })
                    ): (
                            <div style={{position: 'relative'}}>
                            <Loading/>
                            </div>
                    )
                }
                    
                </div>
        </div>
    )
};

export default Hotels