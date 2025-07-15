import React from "react";
import { Link } from "react-router";
import { Typography, Box } from "@mui/material";

export default function AppLogo({ size = 52, color = "#124e56", variant = "h6" }) {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 1.5,
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width={size} 
          height={size} 
          viewBox="0 0 48 48" 
          fill={color}
          style={{ flexShrink: 0 }}
        >
          <g strokeWidth="0"/>
          <g strokeLinecap="round" strokeLinejoin="round"/>
          <g>
            <defs>
              <style>{`.b{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;}`}</style>
            </defs>
            <path 
              className="b" 
              d="M29.4995,12.3739c.7719-.0965,1.5437,.4824,1.5437,1.2543h0l2.5085,23.8312c.0965,.7719-.4824,1.5437-1.2543,1.5437l-23.7347,2.5085c-.7719,.0965-1.5437-.4824-1.5437-1.2543h0l-2.5085-23.7347c-.0965-.7719,.4824-1.5437,1.2543-1.5437l23.7347-2.605Z"
            />
            <path 
              className="b" 
              d="M12.9045,18.9347c-1.7367,.193-3.0874,1.7367-2.8945,3.5699,.193,1.7367,1.7367,3.0874,3.5699,2.8945,1.7367-.193,3.0874-1.7367,2.8945-3.5699s-1.8332-3.0874-3.5699-2.8945h0Zm8.7799,5.596l-4.6312,5.6925c-.193,.193-.4824,.2894-.6754,.0965h0l-1.0613-.8683c-.193-.193-.5789-.0965-.6754,.0965l-5.0171,6.1749c-.193,.193-.193,.5789,.0965,.6754-.0965,.0965,.0965,.0965,.193,.0965l19.9719-2.1226c.2894,0,.4824-.2894,.4824-.5789,0-.0965-.0965-.193-.0965-.2894l-7.8151-9.0694c-.2894-.0965-.5789-.0965-.7719,.0965h0Z"
            />
            <path 
              className="b" 
              d="M16.2814,13.8211l.6754-6.0784c.0965-.7719,.7719-1.3508,1.5437-1.2543l23.7347,2.5085c.7719,.0965,1.3508,.7719,1.2543,1.5437h0l-2.5085,23.7347c0,.6754-.7719,1.2543-1.5437,1.2543l-6.1749-.6754"
            />
            <path 
              className="b" 
              d="M32.7799,29.9337l5.3065,.5789c.2894,0,.4824-.193,.5789-.4824,0-.0965,0-.193-.0965-.2894l-5.789-10.5166c-.0965-.193-.4824-.2894-.6754-.193h0l-.3859,.3859"
            />
          </g>
        </svg>
        
        <Typography
          variant={variant}
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.5px",
            color: "text.primary",
            userSelect: "none"
          }}
        >
          IMG Friendly
        </Typography>
      </Box>
    </Link>
  );
}