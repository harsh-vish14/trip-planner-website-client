import { BiRupee } from 'react-icons/all';
const PackageCard = ({ packageCardData,userData,setUserPresent }) => {
    const packageSelected = (packageId) => {
        if (!userData) {
            //('user not logged in')
            setUserPresent(false);
        } else {
            //(packageId);
            fetch('https://python-flask-api-trip.herokuapp.com/addPackage',
          {
            method: 'POST',
            body: JSON.stringify({
              uid: userData.uid,
              packageId
            }),
            mode: 'cors'
                }).then((res) => res.json())
                .then((data) => {
                //(data);
            })
        }
    }
    return (
        <div className="package-card">
        
            <div id={`carouselExampleFade${packageCardData.id}`} className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div className="carousel-item active">
                        <img src={packageCardData.images[0]} height='100%' alt="image-1" />
                    </div>
                    <div className="carousel-item">
                        <img src={packageCardData.images[1]} height='100%' alt="image-2" />
                    </div>
                    <div className="carousel-item">
                        <img src={packageCardData.images[2]} height='100%' alt="image-3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleFade${packageCardData.id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleFade${packageCardData.id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="package-name">
                {packageCardData.name}
            </div>
            <div className="package-information">
                {packageCardData.description}
            </div>
            <div className="package-price">
                {packageCardData.price} <BiRupee />
            </div>
            <div className="package-book-btn" onClick={()=>{packageSelected(packageCardData.id)}}>
                Book Package
            </div>
        </div>
    )
};

export default PackageCard