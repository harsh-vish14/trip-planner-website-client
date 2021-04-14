import {useEffect, useState} from 'react';
import PackageCard from '../package/packageCard';
import { Redirect } from 'react-router';
// import PackageCart from '../package/packageCard';
import './package.css';
import Loading from '../loading/loading';
const Package = ({ userData }) => {
    const [packageData, setPackageData] = useState(null);
    useEffect(async () => {
        await fetch('https://python-flask-api-trip.herokuapp.com/packages')
            .then((res) => res.json())
            .then((data) => {
                setPackageData(data);
                //(data)
            })
    },[]);
    return (
        <div className="package">
            
            <div className="package-header">
                Trending destinations
            </div>
            <div className="package-packages">
                <div className="package-title">
                    Packages
                </div>
                <div className="package-cards">
                    {packageData ? (
                        packageData.map((packageCard) => {
                            return(<PackageCard packageCardData={packageCard} key={packageCard.id} userData={userData}/>)
                        })
                    ) : (
                            <div style={{position: 'relative'}}>
                            <Loading/>
                            </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Package