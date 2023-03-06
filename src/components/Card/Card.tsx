import "./card.scss";
import shareIcon from "../../assets/images/share-outline.svg";
import downloadIcon from "../../assets/images/download-outline.svg";

interface CardProps {
  image: string;
  name: string;
  prompt: string;
  type: string;
}

const Card = ({ image, name, prompt, type }: CardProps) => {

  return (
    <div className={`card ${type}`} style={{["--user-name" as any]: name}}>
      <img src={image} />
      <div className="top">
        <p>{name}</p>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="user-p" data-name={name}>
            <p>{name.split("")[0].toUpperCase()}</p>
          </span>
        </div>
        <div className="right">
          <span className="share">
            <img src={shareIcon} />
          </span>
          <span className="download">
            <img src={downloadIcon} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
