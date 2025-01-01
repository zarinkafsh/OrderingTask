import { List } from "../components/list";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
