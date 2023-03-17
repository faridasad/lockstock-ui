import "./card.scss";
import shareIcon from "../../assets/images/share-outline.svg";
import downloadIcon from "../../assets/images/download-outline.svg";
import download from "../../utils/download";
import copy from "../../utils/copy";
import { useNavigate } from "react-router-dom";
import { useState } from "react";4
import BlurredImage from "../BlurredImage";

interface CardProps {
  image: string;
  name: string;
  prompt: string;
  type: string;
  id: string;
  hash: string;
}


const Card = ({ image, name, prompt, type, id, hash }: CardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();


  return (
    <div
      className={`card ${type}`}
      style={{ ["--user-name" as any]: name }}
      onClick={() => navigate(`/${id}`)}
    >
      <BlurredImage hash={hash} src={image} />
      <div className="top">
        <p>{prompt}</p>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="user-p" data-name={name}>
            <p>{name.split("")[0].toUpperCase()}</p>
          </span>
        </div>
        <div className="right">
          <span className={isCopied ? "share copied" : "share"}>
            <img
              alt="share"
              src={shareIcon}
              onClick={(e) => {
                e.stopPropagation();
                copy(`${import.meta.env.VITE_CLIENT_BASE_URL}/${id}`).then(
                  () => {
                    setIsCopied(true);
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 2000);
                  }
                );
              }}
            />
          </span>
          <span
            className="download"
            onClick={(e) => {
              e.stopPropagation();
              download(image, `${prompt.slice(0, 15)}....png`);
            }}
          >
            <img src={downloadIcon} alt="download" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
