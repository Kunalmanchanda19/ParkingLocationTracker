import React from "react";

interface RadialSeparatorsProps {
  count: number;
  style?: React.CSSProperties;
}

const RadialSeparators: React.FC<RadialSeparatorsProps> = ({ count, style }) => {
  const turns = 1 / count;
  return (
    <>
      {[...new Array(count)].map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            height: "100%",
            transform: `rotate(${index * turns}turn)`,
          }}
        >
          <div style={style} />
        </div>
      ))}
    </>
  );
};

export default RadialSeparators;
