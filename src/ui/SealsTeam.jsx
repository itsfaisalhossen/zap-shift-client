import SectionTitle from "./SectionTitle";
import Marquee from "react-fast-marquee";
import img1 from "../assets/brands/amazon.png";
import img2 from "../assets/brands/amazon_vector.png";
import img3 from "../assets/brands/casio.png";
import img4 from "../assets/brands/moonstar.png";
import img5 from "../assets/brands/randstad.png";
import img6 from "../assets/brands/star.png";
import img7 from "../assets/brands/start_people.png";

const SealsTeam = () => {
  return (
    <div className="my-16">
      <SectionTitle title="We ve helped thousands of sales teams" />
      <Marquee className="py-20 bg-gray-100">
        <div className="flex gap-10 md:gap-20">
          <img width={80} src={img1} alt="" />
          <img width={80} src={img2} alt="" />
          <img width={80} src={img3} alt="" />
          <img width={80} src={img4} alt="" />
          <img width={80} src={img5} alt="" />
          <img width={80} src={img6} alt="" />
          <img width={80} src={img7} alt="" />
        </div>
      </Marquee>
    </div>
  );
};
export default SealsTeam;
