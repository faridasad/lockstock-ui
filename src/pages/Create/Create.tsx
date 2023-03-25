import axios from "axios";
import "./create.scss";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import encodeImageToBlurhash from "../../utils/blurhashEncode";

const Create = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    image: "",
    isGenerated: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMotionOpen, setIsMotionOpen] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    query.matches && setIsMotionOpen(false);
  }, []);

  const generateImage = async () => {
    if (!form.prompt || isGenerating) return;

    try {
      setStatusText("");
      setIsGenerating(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/dalle`,
        {
          prompt: form.prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      if (data) {
        setForm({
          ...form,
          image: `data:image/jpeg;base64,${data.image}`,
          isGenerated: true,
        });
      }
    } catch (error) {
      setStatusText(
        "Something went wrong with the server, please try again later"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const sharePost = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.prompt || !form.image) return;

    if (!form.isGenerated) {
      setStatusText("Please generate an image first");
      return;
    }

    try {
      setIsSharing(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/create`,
        {
          name: form.name,
          prompt: form.prompt,
          image: form.image,
          blurhash: await encodeImageToBlurhash(form.image),
        },
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <section className="create">
      <div className="wrapper">
        <h2>GENERATE IMAGE</h2>

        <form className="post-form" onSubmit={sharePost}>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <div className="image-form">
            <input
              onChange={(e) => {
                setForm({
                  ...form,
                  prompt: e.target.value,
                  isGenerated: false,
                });
              }}
              disabled={isGenerating}
              type="text"
              placeholder="Describe your image as you want to"
            />
            <button
              type="button"
              disabled={isGenerating}
              onClick={generateImage}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="image-con">
            {!isGenerating ? (
              <img
                draggable="false"
                src={form.image || "https://via.placeholder.com/1024x1024"}
              />
            ) : (
              isMotionOpen ? (
                <Loader />
              ) :
              <span className="loader_no-animated">loading...</span>
            )}
          </div>

          {statusText && <p className="status-text">{statusText}</p>}

          <button type="submit" disabled={isSharing}>
            {isSharing ? "Sharing" : "Share"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Create;
