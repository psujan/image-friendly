import React from "react";
import { Typography, Box, Button, IconButton, Skeleton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useRef, useState } from "react";
import { allowedImageExtensions } from "../../../../backend/utils/constant.js";
import Toast from "../../utils/toast.js";
import PageLayout from "../../components/PageLayout.jsx";
import CropForm from "./partials/CropForm.jsx";
import { canvasPreview } from "./partials/canvasPreview.js";
import { useDebounceEffect } from "./partials/useDebounceEffect.js";
import theme from "../../utils/theme.js";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

export default function CropPageNew() {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);
  const [preview, setPreview] = useState(null);

  const deleteFile = () => {
    setImageInfo(null);
    setPreview(null);
    resetFile();
    localStorage.removeItem("currentSingleUploadedItem");
  };

  // This is to demonstate how to make and center a % aspect crop
  // which is a bit trickier so we use some helper functions.
  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  const handleUploadClick = () => {
    if (isUploading) {
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }

    handleFileReader();
  };

  const handleFileReader = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImageInfo({
          width: img.naturalWidth,
          height: img.naturalHeight,
          sizeInMB: (file.size / (1024 * 1024)).toFixed(2),
          format: file.type,
          name: file.name,
        });
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
    setImageInfo(file);
  };

  const backToUpload = () => {
    setIsUploaded(false);
    setCrop(undefined);
    setImgSrc(null);
    setCompletedCrop();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Get file extension
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Validate extension
    if (!allowedImageExtensions.includes(fileExtension)) {
      Toast.error(
        "Unsupported image format. Allowed: " +
          allowedImageExtensions.toString()
      );
      resetFile();
      return;
    }

    // Optional: check MIME type also (good fallback)
    if (!file.type.startsWith("image/")) {
      Toast.error("The selected files is not an image");
      resetFile();
      return;
    }

    setCrop(undefined); // Makes crop preview update between images.
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgSrc(reader.result?.toString() || "");
    });
    reader.readAsDataURL(e.target.files[0]);
    setIsUploaded(true);
    handleFileReader(file);
  };

  const resetFile = () => {
    // Reset file input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <PageLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: "20px" }}>
        <Box sx={{ flex: 2 }}>
          {isUploaded ? (
            <Button onClick={() => backToUpload()} variant="text">
              <KeyboardBackspaceOutlinedIcon sx={{ marginRight: "6px" }} />
              Back To Upload
            </Button>
          ) : (
            <div>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                Crop Image
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  mb: 4,
                }}
              >
                Please click on image after uploading to control drag position
              </Typography>
            </div>
          )}

          {imageInfo ? (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                padding: "4px",
                border: "1px solid var(--border-color)",
                justifyContent: "space-between",
                width: "80%",
                borderRadius: "6px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <img
                  src={preview}
                  alt=""
                  style={{
                    borderRadius: "8px",
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                />

                <Box sx={{ marginLeft: "10px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {imageInfo?.name}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 400, color: "#666" }}
                    >
                      {imageInfo.sizeInMB + " Mb"}
                    </Typography>
                    <Typography variant="caption" sx={{ padding: "0 6px" }}>
                      |
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 400, color: "#666" }}
                    >
                      {imageInfo.width + "*" + imageInfo.height}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <IconButton
                  onClick={() => deleteFile()}
                  aria-label="delete"
                  sx={{ color: theme.palette.error.main }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            ""
          )}

          <Box sx={{ mt: 2 }} className="react-crop-container">
            {!isUploaded ? (
              <Box sx={{ mt: 2 }}>
                <Box
                  onClick={() => handleUploadClick()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleUploadClick();
                  }}
                  role={"button"}
                  variant="contained"
                  tabIndex={-1}
                  className="upload-box"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--primary-light-80)",
                    width: "80%",
                    height: "150px",
                    color: "var(--primary-color)",
                    transition: "0.35s ease",
                    boxShadow: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: "2px dashed var(--primary-color)",

                    "&:hover": {
                      border: "2px solid var(--primary-color)",
                      boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <CloudUploadOutlinedIcon sx={{ fontSize: "44px" }} />
                    <span
                      style={{
                        textTransform: "capitalize",
                        fontSize: "20px",
                        display: "block",
                        marginTop: "8px",
                      }}
                    >
                      {isUploading
                        ? " Uploading Image ..."
                        : "Upload Image Here"}
                    </span>
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
            <Box sx={{ mt: 2, maxWidth: "80%" }}>
              {!!imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  // minWidth={400}
                  minHeight={100}
                  // circularCrop
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                    }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              )}
              {!!completedCrop && (
                <>
                  <div>
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        border: "1px solid black",
                        objectFit: "contain",
                        width: completedCrop.width,
                        height: completedCrop.height,
                      }}
                    />
                  </div>
                  <div>
                    <button onClick={onDownloadCropClick}>Download Crop</button>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      If you get a security error when downloading try opening
                      the Preview in a new tab (icon near top right).
                    </div>
                    <a
                      href="#hidden"
                      ref={hiddenAnchorRef}
                      download
                     
                    >
                      Hidden download
                    </a>
                  </div>
                </>
              )}
            </Box>
          </Box>

          <input
            type="file"
            style={{ visibility: "hidden" }}
            ref={fileInputRef}
            onChange={(event) => handleFileUpload(event)}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            position: "sticky",
            top: "20px", // distance from top of the viewport
            alignSelf: "flex-start", // important when inside flexbox
            // outline: "1px solid red",
          }}
          className="crop-control-box"
        >
          <CropForm />
        </Box>
      </Box>
    </PageLayout>
  );
}
