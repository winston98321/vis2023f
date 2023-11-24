import define1 from "./b4b821d169d4ff8e@271.js";

function _1(md){return(
md`# HW4 Strong`
)}

function _artist(FileAttachment){return(
FileAttachment("artist.csv").csv()
)}

function _innerQ(artist){return(
Object.keys(artist[0])[8]
)}

function _outerQ(artist){return(
Object.keys(artist[0])[15]
)}

function _chart(consoleHook,data,d3)
{
  consoleHook
  // 轉換資料格式
  const hierarchicalData = {
    name: "total",
    children: data.map(d => ({
      name: d.region,
      children: Object.entries(d)
        .filter(([key, value]) => key !== "region" && key !== "total")
        .map(([key, value]) => ({ name: key, value })),
    })),
  };
  
  // Specify the chart’s dimensions.
  const width = 950;
  const height = 900;
  const format = d3.format(",d");
  
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateBrBG, hierarchicalData.children.length))
  
  const partition = d3.partition()
      .size([height, width])
      .padding(1);
  
  const root = partition(d3.hierarchy(hierarchicalData)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value));
  
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif");
  
  const cell = svg
    .selectAll()
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y0},${d.x0})`)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);;
  
  cell.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  
  cell.append("rect")
      .attr("width", d => d.y1 - d.y0)
      .attr("height", d => d.x1 - d.x0)
      .attr("fill-opacity", 0.6)
      .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      });
  
  const text = cell.filter(d => (d.x1 - d.x0) > 16).append("text")
      .attr("x", 4)
      .attr("y", 13);
  
  text.append("tspan")
      .text(d => d.data.name)
      .attr("dy", "0.2em")
      .style("font-weight", "bold")
      .style("font-size", "12px");
  
  text.append("tspan")
      .attr("fill-opacity", 0.7)
      .attr("dx", "2.4em")
      // .attr("dy", "1.2em")
      .text(d => `人數: ${format(d.value)}`);

  // Tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  function handleMouseOver(d) {
    // 鼠標懸停時的顏色變化
    d3.select(this).select("rect")
      .attr("fill", "orange");

    // 顯示 Tooltip
    tooltip.transition()
      .duration(200)
      .style("opacity", .9);

    tooltip.html(`${d.ancestors().map(d => d.data.name).reverse().join("/")}<br/>人數: ${format(d.value)}`)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  }

  function handleMouseOut(d) {
    // 恢復原本的顏色
    d3.select(this).select("rect")
      .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      });

    // 隱藏 Tooltip
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  }

  return svg.node();
}


function _data(artist,innerQ,outerQ)
{
  // consoleHook;
  var col1 = artist.map(row => row[innerQ]);
  var col2 = artist.map(row => row[outerQ]);

  var combined = {}
  col1.map((col1Ans, idx)=> {
    var col2Ans = col2[idx];
    
    if(col1Ans in combined) {
      if(col2Ans in combined[col1Ans]){
          combined[col1Ans][col2Ans] += 1;
      } else {
        combined[col1Ans][col2Ans] = 1;
      }
      combined[col1Ans]["total"] += 1;
    } else {
      combined[col1Ans] = {};
      combined[col1Ans][col2Ans] = 1;
      combined[col1Ans]["total"] = 1;
    }     
  })

  var datas = []
  for(const key in combined){
    combined[key]["region"] = key;
    datas.push(combined[key])
  }


  console.log(datas)
  return datas;
}


function _8(md){return(
md`<h2>結論:</h2>
<h3>從上圖中可以發現<br>
--設計此類問卷中間數字(3/5)會是最大眾的選項<br>
--在本問卷中有推動永續事務、沒有的認知較為明確，少有人不清楚<br>
--在認為藝術、機構治理相關度最高分(5)、最低分(1)的族群中工作處有推動、沒推動永續事務人數都近半，因此兩者間較無強烈因果關係<br></h3>
`
)}

function _width(){return(
640
)}

function _radius(){return(
320
)}

function _partition(d3,radius){return(
data =>
  d3.partition().size([2 * Math.PI, radius * radius])(
    d3
      .hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value)
  )
)}

function _mousearc(d3,radius){return(
d3
  .arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => Math.sqrt(d.y0))
  .outerRadius(radius)
)}

function _color(d3){return(
d3
  .scaleOrdinal()
  .domain(["1", "2", "3", "4","5", "有，以行動或計畫進行","不清楚","沒有"])
  //.range(d3.schemePaired)
  .range(["	#804040","#7373B9","#9F4D95","#FFED97","#B5CAA0","#8E8E8E","#B15BFF","#F75000"])
  .unknown("#949449")
)}

function _arc(d3,radius){return(
d3
  .arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .padAngle(1 / radius)
  .padRadius(radius)
  .innerRadius(d => Math.sqrt(d.y0))
  .outerRadius(d => Math.sqrt(d.y1) - 1)
)}

function _breadcrumbWidth(){return(
75
)}

function _breadcrumbHeight(){return(
30
)}

function _breadcrumbPoints(breadcrumbWidth,breadcrumbHeight){return(
function breadcrumbPoints(d, i) {
  const tipWidth = 10;
  const points = [];
  points.push("0,0");
  points.push(`${breadcrumbWidth},0`);
  points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
  points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
  points.push(`0,${breadcrumbHeight}`);
  if (i > 0) {
    // Leftmost breadcrumb; don't include 6th vertex.
    points.push(`${tipWidth},${breadcrumbHeight / 2}`);
  }
  return points.join(" ");
}
)}

function _18(md){return(
md`<style>
.tooltip {
  padding: 8px 12px;
  color: white;
  border-radius: 6px;
  border: 2px solid rgba(255,255,255,0.5);
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
  pointer-events: none;
  transform: translate(-50%, -100%);
  font-family: "Helvetica", sans-serif;
  background: rgba(20,10,30,0.6);
  transition: 0.2s opacity ease-out, 0.1s border-color ease-out;
}
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist.csv", {url: new URL("./artist.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("innerQ")).define("innerQ", ["artist"], _innerQ);
  main.variable(observer("outerQ")).define("outerQ", ["artist"], _outerQ);
  const child1 = runtime.module(define1);
  main.import("log", child1);
  main.import("consoleHook", child1);
  main.variable(observer("chart")).define("chart", ["consoleHook","data","d3"], _chart);
  main.variable(observer("data")).define("data", ["artist","innerQ","outerQ"], _data);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("radius")).define("radius", _radius);
  main.variable(observer("partition")).define("partition", ["d3","radius"], _partition);
  main.variable(observer("mousearc")).define("mousearc", ["d3","radius"], _mousearc);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("arc")).define("arc", ["d3","radius"], _arc);
  main.variable(observer("breadcrumbWidth")).define("breadcrumbWidth", _breadcrumbWidth);
  main.variable(observer("breadcrumbHeight")).define("breadcrumbHeight", _breadcrumbHeight);
  main.variable(observer("breadcrumbPoints")).define("breadcrumbPoints", ["breadcrumbWidth","breadcrumbHeight"], _breadcrumbPoints);
  main.variable(observer()).define(["md"], _18);
  return main;
}
