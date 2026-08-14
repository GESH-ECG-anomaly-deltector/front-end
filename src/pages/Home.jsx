import NavBar from "../components/NavBar";
import LandingHero from "../components/LandingHero";
import Steps from "../components/Steps";

const Home = () => {
    return ( 
        <div className="font-vazir">
            <div className="
                h-fit
                bg-[radial-gradient(ellipse_14400px_30000px_at_top_right,#EEF4FB_0%,_#EEF4FB_70%,_white_100%)]  
                w-full
                px-[9rem]
                ">
                    <NavBar />
                <div>
                </div>
                <LandingHero />
            </div>
            <div className="px-[9rem]">
                <Steps />
            </div>
        </div>
     );
}
 
export default Home;
