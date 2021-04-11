import {useEffect, useState} from 'react';
import PackageCard from '../package/packageCard';
import { Redirect } from 'react-router';
// import PackageCart from '../package/packageCard';
import './package.css';
const Package = ({ userData, userPresent, setUserPresent }) => {
    const [packageData, setPackageData] = useState(null);
    useEffect(async () => {
        await fetch('http://127.0.0.1:5000/packages')
            .then((res) => res.json())
            .then((data) => {
                setPackageData(data);
                console.log(data)
            })
    },[]);
    return (
        <div className="package">
            {userPresent?(null):(<Redirect to="/register" />)}
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
                            return(<PackageCard packageCardData={packageCard} key={packageCard.id} userData={userData} setUserPresent={setUserPresent}/>)
                        })
                    ): (
                            <div>loading.....</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Package