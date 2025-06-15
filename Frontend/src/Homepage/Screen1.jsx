// import Screen1Image from '../assets/screen1image.jpg'
// import Screen1Image2 from '../assets/screen1image2.jpg'
import Screen1Image from '../assets/newScreen4.jpg'
import Screen1Image2 from '../assets/newScreen6.jpg'
import './Homepage.css'
import Navbar from './Navbar'
import personalPageBg from '../videos/personal_Page_bg.mp4'

export default function Screen1(){
    return(
        <>
            <div className='screen1'>
                <Navbar/>
                {/* <video className='screen1Image' src={personalPageBg} autoPlay></video> */}
                <img className='screen1Image' src={Screen1Image} alt="screen" />
                <img className='screen1Image2' src={Screen1Image2} alt="screen" />
                <p className='screenText'>“Passion in every turn, precision in every mile.”</p>
            </div>
        </>
        
    )
}