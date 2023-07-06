import Banner from "./Banner";
import Review from "./Review";
import Instructor from "./Instructor";
import PopularClasses from "./PopularClasses";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Melody Academy || Home</title>
      </Helmet>
      <Banner />
      <PopularClasses />
      <Instructor />
      <Review />
    </div>
  );
};

export default Home;
