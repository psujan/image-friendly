import React, { useState, useRef } from 'react';

const DraggableImageItem = ({ image, index, onReorder }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = dragRef.current.getBoundingClientRect();
    startPos.current = { x: e.clientX, y: e.clientY };
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    
    if (dragRef.current) {
      dragRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      dragRef.current.style.zIndex = '1000';
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    if (dragRef.current) {
      dragRef.current.style.transform = '';
      dragRef.current.style.zIndex = '';
    }
    
    // Calculate drop position and reorder
    const dropY = e.clientY;
    const containerRect = dragRef.current.closest('.gallery-container').getBoundingClientRect();
    const itemHeight = 122; // Approximate height of each item
    const newIndex = Math.floor((dropY - containerRect.top) / itemHeight);
    
    if (newIndex !== index && newIndex >= 0 && newIndex < 3) {
      onReorder(index, newIndex);
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const itemStyles = {
    display: "flex",
    padding: "8px",
    borderBottom: "1px solid #e0e0e0",
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    position: 'relative',
    backgroundColor: isDragging ? '#f5f5f5' : 'transparent',
    transition: isDragging ? 'none' : 'all 0.2s ease',
    alignItems: 'center'
  };

  return (
    <div
      ref={dragRef}
      style={itemStyles}
      onMouseDown={handleMouseDown}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.target.style.backgroundColor = '#f9f9f9';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.target.style.backgroundColor = 'transparent';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px', minWidth: '20px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>
          {index + 1}
        </span>
      </div>
      <img
        src={image.src}
        alt={image.alt}
        style={{ 
          width: "180px", 
          height: "100px", 
          borderRadius: "4px",
          pointerEvents: 'none'
        }}
      />
      <div style={{ marginLeft: "14px" }}>
        <div style={{ fontSize: '14px', marginBottom: '4px' }}>{image.name}</div>
        <div style={{ color: "#666", fontSize: "13px" }}>
          {image.size}
        </div>
      </div>
    </div>
  );
};

export default function GalleryPage() {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1752647549~exp=1752651149~hmac=19f1674f40097c92c87f7593ca27e2e5d7eac2b1c9099d4726670b1ead5adc2f&w=1380",
      alt: "Sunset image",
      name: "sunset_lake.jpeg",
      size: "4Mb"
    },
    {
      id: 2,
      src: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1752647549~exp=1752651149~hmac=19f1674f40097c92c87f7593ca27e2e5d7eac2b1c9099d4726670b1ead5adc2f&w=1380",
      alt: "Mountain image",
      name: "mountain_view.jpeg",
      size: "3.2Mb"
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1752647549~exp=1752651149~hmac=19f1674f40097c92c87f7593ca27e2e5d7eac2b1c9099d4726670b1ead5adc2f&w=1380",
      alt: "Nature image",
      name: "nature_scene.jpeg",
      size: "5.1Mb"
    }
  ]);

  const handleReorder = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setImages(newImages);
  };

  const containerStyles = {
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    padding: "16px",
    marginBottom: "24px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  };

  const buttonStyles = {
    padding: "8px 16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "14px"
  };

  const generateButtonStyles = {
    padding: "12px 24px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: "600", margin: 0 }}>
            My College Gallery
          </h2>
          <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0 0" }}>
            Drag and drop to reorder images
          </p>
        </div>
        <button style={buttonStyles} onClick={() => {}}>
          Delete
        </button>
      </div>
      
      <div style={{ padding: "8px", marginBottom: "16px" }} className="gallery-container">
        {images.map((image, index) => (
          <DraggableImageItem
            key={image.id}
            image={image}
            index={index}
            onReorder={handleReorder}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={generateButtonStyles}>
          Generate Powerpoint
        </button>
      </div>
    </div>
  );
}