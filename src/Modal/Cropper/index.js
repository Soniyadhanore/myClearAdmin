import React , { useRef, useState } from "react";
import Button from "antd/es/button";
import TextArea from "antd/es/input/TextArea";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const ImageCropper = ({
  cropperImage,
  closepopup,
  setCropImage,
  otherParams = {},
}) => {
  //   const navigate = useNavigate();
  //   const { t } = useTranslation();
  const [croppedImage, setCroppedImage] = useState("");
  const cropperRef = useRef(null);
  
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };
  const handleCropperdImage = () => {
    setCropImage({
      croppedImage: croppedImage,
    });
    closepopup();
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none sm:px-4 w-fit h-fit m-auto">
        <div
          className="relative w-auto my-auto mx-auto max-w-600 min-w-[600px] sm:min-w-full"
          style={{ maxWidth: "600px" }}
        >
          <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="p-6 relative">
              <TextArea className="font-proximanova text-black_900 mb-3" variant="h3" as="h3">
                Image Cropper{" "}
              </TextArea>
              <Cropper
                src={cropperImage}
                style={{ height: 400, width: "100%" }}
                guides={false}
                responsive={true}
                restore={true}
                crop={onCrop}
                ref={cropperRef}
                {...otherParams}
              />
              <div className="flex justify-end items-center gap-3 mt-5">
                <Button
                  className="ease-linear transition-all duration-150 w-[90px]"
                  variant={"OutlineBlack900"} size="sm" onClick={closepopup}
                > Cancel </Button>
                <Button
                  className="ease-linear transition-all duration-150 w-[90px]"
                  variant={"FillRed900"} size="sm" onClick={handleCropperdImage}
                > Crop </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black"
        onClick={() => closepopup(false)}
      ></div>
    </>
  );
};
export default ImageCropper;