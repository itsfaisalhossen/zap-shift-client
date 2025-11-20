import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bImg1 from "../assets/banner/banner1.png";
import bImg2 from "../assets/banner/banner2.png";
import bImg3 from "../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="my-12">
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <img src={bImg1} />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={bImg2} />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={bImg3} />
          <p className="legend">Legend 1</p>
        </div>
      </Carousel>
    </div>
  );
};
export default Banner;
