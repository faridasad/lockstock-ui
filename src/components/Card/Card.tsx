import "./card.scss";

interface CardProps {
  image: string;
  name: string;
  prompt: string;
  type: string;
}

const Card = ({ image, name, prompt, type }: CardProps) => {
  return (
    <div className={`card ${type}`}>
      <img src={image} />
      <div className="top">
        <p>{name}</p>
      </div>
      <div className="bottom">
        <p>{prompt}</p>
      </div>
    </div>
  );
};

export default Card;
