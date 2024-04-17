import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <>
      <Link to="/venues" className="cursor-pointer text-8xl">
        Venues
      </Link>
    </>
  );
};

export default Home;
