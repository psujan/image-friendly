import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import helper from "../../../utils/helper.js";
import { Box, Typography } from "@mui/material";

const SortableImage = ({ image, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: image.id,
  });

  const handleMouseDown = listeners?.onMouseDown;

  const itemStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    padding: "8px",
    borderRadius: "8px",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    position: "relative",
    backgroundColor: isDragging ? "var(--primary-color-80)" : "#fafafa",
    alignItems: "center",
    boxShadow: isDragging
      ? "0px 4px 18px rgba(0, 0, 0, 0.2)"
      : "0px 1px 3px rgba(0, 0, 0, 0.05)",
    scale: isDragging ? "1.02" : "1",
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={itemStyles}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
    >
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            marginRight: "18px",
            display: "inline-flex",
            width: "20px",
            height: "20px",
            fontSize: "10px",
            backgroundColor: "var(--primary-light-30)",
            color: "#fff",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {index + 1}
        </Box>
        <img
          src={image.imageUrl}
          alt={image?.alt || "GAL_IMG"}
          style={{ width: "180px", height: "100px", borderRadius: "4px" }}
        />
      </Box>
      <Box sx={{ marginLeft: "14px" }}>
        <Typography variant="body">
          {image.originalName + "                      Id:" + image.id}
        </Typography>
        <Typography sx={{ color: "#666", fontSize: "13px", mt: 1 }}>
          {helper.byteToMb(image.size) + " Mb"}
        </Typography>
      </Box>
    </Box>
  );
};

export default SortableImage;
