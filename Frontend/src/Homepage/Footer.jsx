import Companylogo from '../assets/logo.png'
import Pakflag from '../assets/PakFlag.jpg'
import Usaflag from '../assets/UsaFlag.jpg'
import Youtube from '../assets/youtube.svg'
import Instagram from '../assets/instagram.svg'
import Facebook from '../assets/facebook.svg'
import Twitter from '../assets/twitter.svg'
import './Homepage.css'

export default function Footer(){
    return(
        <>
            <div className="footer">
                <div className="row1">
                    {/* <img className='footer-flags' src={Pakflag} alt="PakFlag" /> */}
                    <img className='footer-flags' src={Companylogo} alt="logo" />
                    {/* <img className='footer-flags' src={Usaflag} alt="UsaFlag" /> */}
                </div>
                <div className="row2">
                    <p>“Innovation that moves you.”</p>
                </div>
                <div className="row3">
                    <a href="/about">About</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/Terms">Terms & conditions</a>
                    <a href="/contact">Contact us</a>
                </div>
                <div className="row4">
                    <img className='social-media-logo' src={Youtube} alt="Youtube" />
                    <img className='social-media-logo' src={Instagram} alt="Instagram" />
                    <img className='social-media-logo' src={Facebook} alt="Facebook" />
                    <img className='social-media-logo' src={Twitter} alt="Twitter" />
                </div>
            </div>
        </>
    )
}