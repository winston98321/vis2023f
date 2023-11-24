function _1(md){return(
md`# HW6 Stacked bar chart`
)}

function _artistPublic(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistPublic.csv"),{from:{table:"artistPublic"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistVer(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistVer.csv"),{from:{table:"artistVer"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _ver(artistVer){return(
Object.keys(artistVer[0])[3]
)}

function _Blic(artistPublic){return(
Object.keys(artistPublic[0])[4]
)}

function _ver_col(artistVer,ver){return(
artistVer.map(row => row[ver])
)}

function _public_col(artistPublic,Blic){return(
artistPublic.map(row => row[Blic])
)}

function _value(ver_col){return(
[...new Set(ver_col)].sort()
)}

function _ver_total(value,ver_col){return(
value.map(val => ({
  value: val,
  count: ver_col.filter(v => v === val).length
}))
)}

function _public_total(value,public_col){return(
value.map(val => ({
  value: val,
  count: public_col.filter(v => v === val).length
}))
)}

function _data(ver_total,public_total){return(
ver_total.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'artist'
  },
  {
    value: item.value,
    count: public_total[index].count,
    series: 'artistpublic'
  }
]))
)}

function _12(md){return(
md`<h1>Simple baseline</h1>`
)}

function _selectedSeries(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _14(Plot,ver,data,selectedSeries){return(
Plot.plot({
  height: 600,
  title: ver,
  x: {
    label: 'Value',
    domain: data.map(d => d.value),
    padding: 0.1
  },
  y: {
    label: 'Count',
    grid: true
  },
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#7DB9DE', '#F4A7B9'],
    legend: true
  },
  marks: [
    Plot.barY(data.filter(d => selectedSeries.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

function _15(md){return(
md`<h1>Medium baseline</h1>`
)}

function _selectedSeries1(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _chart(data,selectedSeries1,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(data.map(d => d.series)));
  
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#7DB9DE', '#F4A7B9']);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)

          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart1(data,selectedSeries1,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(data.map(d => d.series)));
  
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#7DB9DE', '#F4A7B9']);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        //新增以下兩行可新增出過渡效果
          .transition() 
          .duration(5000) //改為0可以呈現無過度效果
        //新增到這兩行可新增出過渡效果
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _19(md){return(
md`<h1>String baseline<h1>`
)}

function _chart2(data,selectedSeries1,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(data.map(d => d.series)));
  
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });


  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#7DB9DE', '#F4A7B9']);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  
  const defs = svg.append("defs");
  const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  
  filter.append("feGaussianBlur") 
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4) 
      .attr("result", "blur"); 

  filter.append("feOffset") 
      .attr("in", "blur") 
      .attr("dx", 4) 
      .attr("dy", 4) 
      .attr("result", "offsetBlur"); 

  const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
               .attr("in", "offsetBlur");
        feMerge.append("feMergeNode")
               .attr("in", "SourceGraphic"); //


  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("filter", "url(#drop-shadow)")
          .on("mouseover", function(d) {
              d3.select(this).attr("fill", "#CA7A2C");
            
            })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", colorScale(serie.key)); 
        d3.select(".tooltip").remove();

        });
});

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistPublic.csv", {url: new URL("./artistPublic.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistVer.csv", {url: new URL("./artistVer.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistPublic")).define("artistPublic", ["__query","FileAttachment","invalidation"], _artistPublic);
  main.variable(observer("artistVer")).define("artistVer", ["__query","FileAttachment","invalidation"], _artistVer);
  main.variable(observer("ver")).define("ver", ["artistVer"], _ver);
  main.variable(observer("Blic")).define("Blic", ["artistPublic"], _Blic);
  main.variable(observer("ver_col")).define("ver_col", ["artistVer","ver"], _ver_col);
  main.variable(observer("public_col")).define("public_col", ["artistPublic","Blic"], _public_col);
  main.variable(observer("value")).define("value", ["ver_col"], _value);
  main.variable(observer("ver_total")).define("ver_total", ["value","ver_col"], _ver_total);
  main.variable(observer("public_total")).define("public_total", ["value","public_col"], _public_total);
  main.variable(observer("data")).define("data", ["ver_total","public_total"], _data);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof selectedSeries")).define("viewof selectedSeries", ["Inputs"], _selectedSeries);
  main.variable(observer("selectedSeries")).define("selectedSeries", ["Generators", "viewof selectedSeries"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","ver","data","selectedSeries"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof selectedSeries1")).define("viewof selectedSeries1", ["Inputs"], _selectedSeries1);
  main.variable(observer("selectedSeries1")).define("selectedSeries1", ["Generators", "viewof selectedSeries1"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["data","selectedSeries1","d3"], _chart);
  main.variable(observer("chart1")).define("chart1", ["data","selectedSeries1","d3"], _chart1);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("chart2")).define("chart2", ["data","selectedSeries1","d3"], _chart2);
  return main;
}
