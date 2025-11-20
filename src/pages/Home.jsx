import Banner from "../ui/Banner";
import Container from "../ui/Container";
import HowItWorks from "../ui/HowItWorks";
import Reviews from "../ui/Reviews";
import SealsTeam from "../ui/SealsTeam";
import Services from "../ui/Services";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Container>
        <Banner />
        <HowItWorks />
        <Services />
        <SealsTeam />
        <Reviews reviewsPromise={reviewsPromise} />
      </Container>
    </div>
  );
};
export default Home;
