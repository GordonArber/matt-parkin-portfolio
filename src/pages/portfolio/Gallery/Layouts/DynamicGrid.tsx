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

// function ImageGridItem({ image }:{image: string}) {
//   const style = {
//     gridColumnEnd: `span ${getSpanEstimate(image.width)}`,
//     gridRowEnd: `span ${getSpanEstimate(image.height)}`,
//   }

//   return <img style={style} src={image} alt={image.alt} />
// }

// function getSpanEstimate(size:number) {
//   if (size > 250) {
//     return 2
//   }

//   return 1
// }

const DynamicGrid = ({ images, showImage }: DynamicGridProps) => {
  const { user } = useUser();

  const getSpanEstimate = (size: number | undefined) => {
    if (size && size > 3000) {
      return 2;
    }

    return 1;
  };

  const handleSize = (imageRef: HTMLImageElement | null) => {
    const style = {
      gridColumnEnd: `span ${getSpanEstimate(imageRef?.naturalWidth)}`,
      gridRowEnd: `span ${getSpanEstimate(imageRef?.naturalHeight)}`,
    };
    console.log(style.gridColumnEnd, style.gridRowEnd);
  };

  return (
    <div className="dynamicGrid">
      {images.map((image) => (
        <div key={image.id} className="dynamicGrid__container">
          {/* {ImageGridItem(image.picUrl)} */}
          <img
            // style={{ gridColumnEnd: span 2, gridRowEnd: span 2 }}
            ref={(imageRef) => {
              handleSize(imageRef);
            }}
            alt=""
            // onLoad={() => {
            //   const height = imgRef.current?.offsetHeight;
            //   const width = imgRef.current?.clientWidth;
            //   console.log(image.title, height, width);
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
