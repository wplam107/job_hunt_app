import React, { useState, useEffect } from "react";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import JobDataService from "../services/JobService";


const SankeyViz = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = () => {
    JobDataService.getAll()
      .then(response => {
        makeData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const makeData = (data) => {
    let total = 0;
    let yesResponse = 0;
    let noResponse = 0;
    let rejection = 0;
    let interview = 0;

    for (let i = 0; i < data.length; i++) {
      total ++;

      if (data[i]["response"] === "N") {
        noResponse ++;
      } else if (data[i]["response"] === "R") {
        rejection ++;
        yesResponse ++;
      } else {
        interview ++;
        yesResponse ++;
      };
    };

    const vizData = {
      "nodes": [
        {name: `Job Applications: ${total}`},
        {name: `Responded: ${yesResponse}`},
        {name: `No Response: ${noResponse}`},
        {name: `Rejection: ${rejection}`},
        {name: `Follow Up/Interview: ${interview}`}
      ],
      "links": [
        {source: 0, target: 1, value: yesResponse, color:"#dddddd"},
        {source: 0, target: 2, value: noResponse, color:"#dddddd"},
        {source: 1, target: 3, value: rejection, color:"#dddddd"},
        {source: 1, target: 4, value: interview, color:"#dddddd"}
      ]
    };
    
    console.log(vizData);
    setData(vizData);
  };

  const SankeyNode = ({ name, x0, x1, y0, y1, color }) => {
    return (
      <g>
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={color}>
          <title>{name}</title>
        </rect>
        <text x={(x0 + x1) / 2 + 10} y={(y0 + y1) / 2} width={x1 - x0} height={y1 - y0} fill="black">
          {name}
        </text>
      </g>
    );
  };
  
  const SankeyLink = ({ link, color }) => (
    <path
      d={sankeyLinkHorizontal()(link)}
      style={{
        fill: "none",
        strokeOpacity: ".3",
        stroke: color,
        strokeWidth: Math.max(1, link.width)
      }}
    />
  );

  const SankeyDiagram = ({ data, width, height}) => {
    const { nodes, links } = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 5]])(data);
      
    const color = "#666666";

    return (
      <g style={{ mixBlendMode: "multiply" }}>
        {nodes.map((node, i) => (
          <SankeyNode
            {...node}
            color={color}
            key={node.name}
          />
        ))}
        {links.map((link, i) => (
          <SankeyLink
            link={link}
            color={color}
          />
        ))}
      </g>
    )
  };

  const width = 500;
  const height = 500;

  return (
    <div>
      <h2>Sankey Diagram</h2>
      <svg width="100%" height="600">
        {data && (
          <SankeyDiagram data={data} width={width} height={height} />
        )}
      </svg>
    </div>
  );
};

export default SankeyViz;