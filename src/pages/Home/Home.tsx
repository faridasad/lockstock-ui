import "./home.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { useInfiniteQuery, useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";

interface PostProps {
  image: string;
  name: string;
  prompt: string;
  blurhash: string;
  _id: string;
}

const Home = () => {
  const [singlePost, setSinglePost] = useState<any>({});
  const navigate = useNavigate();

  const fetchPosts = async (page = 1, per_page = 10) => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}?per_page=${per_page}&page=${page}`
    );
    return res.data;
  };

  const {
    data,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }: any = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    getNextPageParam: (prevData: any) => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
  });
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

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [location]);


  useEffect(() => {
    console.log(hasNextPage);

    let fetching = false;
    const onScroll = (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target
        .scrollingElement as Element;
      if (!fetching && scrollTop + clientHeight >= scrollHeight * 0.9) {
        fetching = true;
        hasNextPage && fetchNextPage();
        setTimeout(() => {
          fetching = false;
        }, 1000);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, [hasNextPage]);

  if (status === "loading")
    return (
      <div style={{ marginTop: "2rem", scale: "0.9" }}>
        <Loader />
      </div>
    );
  if (status === "error") return <p>Error: {error.message}</p>;

  const onClose = () => {
    navigate("/");
    setSinglePost({});
    document.body.style.overflow = "auto";
  };

  return (
    data && (
      <>
        <div className="home-grid">
          {data.pages.map((page: any) => {
            return page.data.map((post: PostProps, idx: number) => (
              <Card
                hash={post.blurhash}
                image={post.image}
                name={post.name}
                prompt={post.prompt}
                key={idx}
                id={post._id}
                type={
                  idx % 3 === 0
                    ? "h-strecth"
                    : idx % 3 === 0 && idx % 2 === 0
                    ? "v-strecth"
                    : "big-strecth"
                }
              />
            ));
          })}
        </div>

        {isFetchingNextPage && (
          <div style={{ marginBlock: "1rem", scale: "0.8" }}>
            <Loader />
          </div>
        )}

        {/* <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          {hasNextPage ? "Load More" : "No More Posts"}
        </button> */}
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
