import "./styles/even-grid.css";

import { memo } from "react";
import { RemovalIcon } from "../RemovalIcon";
import { EditIcon } from "../EditIcon";
import { useUser } from "../../../../store/userStore";
import { AddCard } from "../AddCard";

interface EvenGridProps {
  images: {
    id: string;
    title: string;
    picUrl: string;
  }[];
  showImage: (image: { id: string; title: string; picUrl: string }) => void;
}

const EvenGrid = ({ images, showImage }: EvenGridProps) => {
  const { user } = useUser();

  return (
    <div className="evenGrid">
      {images.map((image) => (
        <div key={image.id} className="evenGrid__container">
          <img
            alt=""
            className="evenGrid__imageCard"
            onClick={() => showImage(image)}
            src={image.picUrl}
          />
          {user && (
            <div className="evenGrid__imageCardButtonContainer">
              <EditIcon
                id={image.id}
                picUrl={image.picUrl}
                title={image.title}
              />
              <RemovalIcon picUrl={image.picUrl} picId={image.id} />
            </div>
          )}
        </div>
      ))}
      {user && <AddCard />}
    </div>
  );
};

export default memo(EvenGrid);
