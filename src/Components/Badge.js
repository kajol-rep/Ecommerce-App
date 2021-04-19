import React from "react";
export default function Badge({ variant, shape, children, size }) {
  const variants = [
    {
      name: "primary",
      bgColor: "#0d6efd",
      color: "white"
    },
    {
      name: "secondary",
      bgColor: "#6c757d",
      color: "white"
    },
    {
      name: "success",
      bgColor: "#198754",
      color: "white"
    },
    {
      name: "danger",
      bgColor: "#dc3545",
      color: "white"
    },
    {
      name: "warning",
      bgColor: "#ffc107",
      color: "black"
    },
    {
      name: "info",
      bgColor: "#0dcaf0",
      color: "black"
    },
    {
      name: "light",
      bgColor: "#f8f9fa",
      color: "black"
    },
    {
      name: "dark",
      bgColor: "black",
      color: "white"
    }
  ];
  const shapes = [
    {
      name: "capsule",
      border: "20px"
    },
    {
      name: "curved",
      border: "3px"
    },
    {
      name: "square",
      border: "none"
    }
  ];

  const sizes = { xs: "10px", sm: "15px", lg: "20px", xl: "25px" };

  let color = "white";
  let bgColor = "rgb(220, 0, 78)";
  let border = "50%";
  let badgeSize = "12px";

  variants.map((i) => {
    if (variant === i.name) {
      color = i.color;
      bgColor = i.bgColor;
    }
    return i;
  });
  shapes.map((i) => {
    if (shape === i.name) {
      border = i.border;
    }
    return i;
  });
  Object.entries(sizes).map((i, idx) => {
    if (size === i[0]) {
      badgeSize = i[1];
    }
    return i;
  });

  return (
    <div
      style={{
        borderRadius: border,
        backgroundColor: bgColor,
        color: color,
        fontSize: badgeSize,
        width: children ? "" : badgeSize,
        height: children ? "" : badgeSize,
        padding: children ? "0.2rem 0.4rem" : "1px"
      }}
    >
      {children}
    </div>
  );
}
