import "./home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";

interface PostProps {
  image: string;
  name: string;
  prompt: string;
}

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(import.meta.env.VITE_SERVER_URL);
      setData(res.data.data);
    };
    fetchPosts();
  }, []);

  return (
    data && (
      <div className="home-grid">
        {data.map((post: PostProps, i) => {
          return (
            <Card
              image={post.image}
              name={post.name}
              prompt={post.prompt}
              key={i}
              type={
                i % 3 === 0
                  ? "h-strecth"
                  : i % 3 === 0 && i % 2 === 0
                  ? "v-strecth"
                  : "big-strecth"
              }
            />
          );
        })}
      </div>
    )
  );
};

export default Home;
