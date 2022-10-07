import React from "react";

export default function PostTags() {
  return (
    <div
      className="tag"
      style={{
        background: `linear-gradient(to left, #F5C9E0 30%,#47AFDB) 70%`,
      }}
    >
      <span className="tag-text" style={{ color: "#fff" }}>
        태그이름
      </span>
    </div>
  );
}
