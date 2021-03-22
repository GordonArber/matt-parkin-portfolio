import "./styles/dynamic-grid.css";

import { memo } from "react";
import { RemovalIcon } from "../RemovalIcon";
import { EditIcon } from "../EditIcon";
import { useUser } from "../../../../store/userStore";
import { AddCard } from "../AddCard";

interface DynamicGridProps {
  images: {
    id: string;
    title: string;
    picUrl: string;
  }[];
  showImage: (image: { id: string; title: string; picUrl: string }) => void;
}

const DynamicGrid = ({ images, showImage }: DynamicGridProps) => {
  const { user } = useUser();

  return (
    <div className="dynamicGrid">
      {images.map((image) => (
        <div key={image.id} className="evenGrid__container">
          {/* {console.log(image.)} */}
          <img
            alt=""
            // onLoad={()=>{
            //     alert(naturalW+' ' +this?.height)
            // }}
            className="dynamicGrid__imageCard"
            onClick={() => showImage(image)}
            src={image.picUrl}
          />
          {user && (
            <div className="dynamicGrid__imageCardButtonContainer">
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

export default memo(DynamicGrid);
