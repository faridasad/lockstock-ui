import { BlurhashCanvas } from "react-blurhash";
import { useState } from "react";


const BlurredImage = ({ hash, src }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <BlurhashCanvas hash={hash} />}
      <img src={src} onLoad={() => setIsLoaded(true)} style={{display: `${isLoaded ? "block" : "none"}`}}/>
    </>
  );
};

export default BlurredImage;
