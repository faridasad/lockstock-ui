import "./home.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

interface PostProps {
  image: string;
  name: string;
  prompt: string;
  _id: string;
}

const Home = () => {
  const [data, setData] = useState([]);
  const [singlePost, setSinglePost] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(import.meta.env.VITE_SERVER_URL);
      setData(res.data.data);
    };
    fetchPosts();
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      const fetchSinglePost = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/${location.pathname.slice(1)}`
        );

        setSinglePost(res.data.data);
      };
      fetchSinglePost();
      document.body.style.overflow = "hidden";
    }
  }, [location]);

  function onClose() {
    navigate("/");
    setSinglePost({});
    document.body.style.overflow = "auto";
  }

  return (
    data && (
      <>
        <div className="home-grid">
          {data.map((post: PostProps, i) => {
            return (
              <Card
                image={post.image}
                name={post.name}
                prompt={post.prompt}
                key={i}
                id={post._id}
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
        <Modal isOpen={Object.keys(singlePost).length !== 0} onClose={onClose}>
          <div className="modal-content">
            <img src={singlePost.image} />
            <p>{singlePost.prompt}</p>
            <p>- {singlePost.name}</p>
          </div>
        </Modal>
      </>
    )
  );
};

export default Home;
