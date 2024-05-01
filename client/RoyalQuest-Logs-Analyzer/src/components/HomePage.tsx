import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="mt-16 flex items-center justify-center p-16">
        <Link to="sendFiles">Open link</Link>
      </div>
    </>
  );
};

export default HomePage;
