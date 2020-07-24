import React, { useState, useEffect } from "react";
import { Pack, Partition } from "@potion/layout";
import { Svg, Circle, Arc, Rect } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Partition
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    // <Circle
                    //   key={key}
                    //   cx={x}
                    //   cy={y}
                    //   r={r}
                    //   fill={colors[i].code.hex}
                    // />
                    <Rect 
                      key={key}
                      x={Math.random() * 800}
                      y={Math.random() * 0}
                      width={Math.random() * 100}
                      height={Math.random() * 400}
                      fill={colors[i].code.hex}
                    />
                    // <Arc 
                    //   key={key}
                    //   innerRadius={x}
                    //   outerRadius={y}
                    //   startAngle={r}
                    //   endAngle={Math.random()}
                    //   fill={colors[i].code.hex}
                    // />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Partition>
      </Svg>
    </div>
  );
};

export default Bubbles;
