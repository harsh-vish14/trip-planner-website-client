import {useState, useEffect}  from 'react'
import { FaHotel } from 'react-icons/all'
import Hotel from '../hotel/hotel'
import './hotels.css'
const Hotels = () => {
    const [hotelsData, setHotelsData] = useState([]);
    useEffect(async () => {
        await fetch('http://127.0.0.1:5000/hotels')
            .then((res) => res.json())
            .then((data) => {
                setHotelsData(data);
            })
    },[]);
    const hotelsSearch = () => {
        
    }
    return (
        <div className="hotels-page">
            <div className="header">
                <div className="header-title">
                    Find best Hotel for your Vacation
                </div>
                <div className='search-bar'>
                    {/* <div > */}
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Hotel Name" autoComplete={false} />
                    {/* </div> */}
                    <div className='search' onClick={hotelsSearch}>Search Hotel <FaHotel style={{marginLeft:'10px'}}/></div>
                </div>
            </div>
            <div className='hotels-Title'>
                Hotels
            </div>
                <div className='hotels-element'>
                    <Hotel/>
                </div>
        </div>
    )
};

export default Hotels