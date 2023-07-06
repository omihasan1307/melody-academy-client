import Banner from "./Banner";
import Review from "./Review";
import Instructor from "./Instructor";
import PopularClasses from "./PopularClasses";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularClasses />
      <Instructor />
      <Review />
    </div>
  );
};

export default Home;
