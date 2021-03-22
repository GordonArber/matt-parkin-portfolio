import { useCallback, useEffect, useState } from "react";

import { db } from "../../../data/firebase";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import "./styles/gallery.css";
import EvenGrid from "./Layouts/EvenGrid";
import DynamicGrid from "./Layouts/DynamicGrid";

export const Gallery = () => {
  const [imageToShow, setImageToShow] = useState({
    id: "",
    title: "",
    picUrl: "",
  });
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);
  const [respImage, respImageSet] = useState([
    {
      id: "",
      title: "",
      picUrl: "",
    },
  ]);
  const [gallLoad, gallLoadSet] = useState(true);

  useEffect(() => {
    gallLoadSet(true);
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .collection("galleryData")
      .orderBy("timeStamp", "asc")
      .onSnapshot((snapshot) => {
        respImageSet(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            picUrl: doc.data().picUrl,
          }))
        );
        gallLoadSet(false);
      });

    return unsubscribe;
  }, []);

  const showImage = useCallback((importImage) => {
    setImageToShow(importImage);
    setLightBoxDisplay(true);
  }, []);

  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  const showNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    let currentIndex = respImage.indexOf(imageToShow);
    if (currentIndex >= respImage.length - 1) {
      setImageToShow(respImage[0]);
    } else {
      let nextImage = respImage[currentIndex + 1];
      setImageToShow(nextImage);
    }
  };

  const showPrev = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    let currentIndex = respImage.indexOf(imageToShow);
    let indexOfLast = respImage.length - 1;
    if (currentIndex <= 0) {
      setImageToShow(respImage[indexOfLast]);
    } else {
      let nextImage = respImage[currentIndex - 1];
      setImageToShow(nextImage);
    }
  };

  return (
    <main className="gallery">
      {gallLoad ? (
        <div className="routes__loader">
          <Loader
            type="TailSpin"
            color="#6396ab"
            height={80}
            width={80}
            timeout={3000}
          />
        </div>
      ) : (
        <>
          {respImage && (
            <div className="gallery__slidesWrapper">
              <EvenGrid images={respImage} showImage={showImage} />
              <DynamicGrid images={respImage} showImage={showImage} />

              {lightboxDisplay ? (
                <div id="lightbox" onClick={hideLightBox}>
                  <button
                    className="gallery__galleryButton gallery__galleryButtonLeft"
                    onClick={showPrev}
                  >
                    <BsChevronLeft />
                  </button>
                  <div className="gallery__contentWrapper">
                    <img
                      id="lightbox-img"
                      src={imageToShow.picUrl}
                      alt=""
                    ></img>
                    <span className="gallery__caption">
                      {imageToShow.title}
                    </span>
                  </div>
                  <button
                    className="gallery__galleryButton gallery__galleryButtonRight"
                    onClick={showNext}
                  >
                    <BsChevronRight />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
};
