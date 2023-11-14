function _1(md){return(
md`# Strong baseline(2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _Constellation(data){return(
data.map(item => [item.Constellation])
)}

function _Constellationmap(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座","處女座", "天秤座", "天蠍座", "射手座", "摩羯座","水瓶座", "雙魚座"]
)}

function _6(yCounts,Constellation,data)
{
  yCounts.length = 0; //initialize
  
  var minConstellation =  Math.min(...Constellation);
  var maxConstellation = Math.max(...Constellation);
  for (var y=minConstellation; y<=maxConstellation; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({Constellation:y, gender:"male", count:0}); 
    yCounts.push({Constellation:y, gender:"female", count:0}); 
  }
  data.forEach (x=> {
    var i = (x.Constellation-minConstellation)*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //加總每個星座的人
  })
  return yCounts
}


function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _8(Plot,plot2,Constellationmap,yCounts){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  x: {
    label: "Constellation",
    tickFormat: (d,i) => Constellationmap[i],ticks:12 // 使用星座名稱作為標籤
  },
  y: {grid: true, label: "count",  title: 1},
  
  marks: [  
    Plot.ruleY([0]),
		Plot.barY(yCounts, {y:"count",  x:"Constellation",  fill:"Gender", 
              title: (d,i) => `Constellation: ${Constellationmap[Math.floor(i/2)]},\n Gender: ${d.gender},\n count: ${d.count}:`, tip: true,fill:"gender"}),  
	 ],
  
})
)}

function _9(Plot,data,Constellationmap){return(
Plot.plot({
  width:1000,
  y: {grid: true, label: "count"},
  x: {label: "Constellation"},
  marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", 
              title: (d,i) => `Constellation: ${Constellationmap[d.Constellation]},\n Gender: ${d.Gender}:`, tip: true})),    
    Plot.axisX({
      tickFormat: d => {
        return Constellationmap[d]; 
      },ticks:12}),
    Plot.ruleY([0]),
	 ]
  
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("Constellation")).define("Constellation", ["data"], _Constellation);
  main.variable(observer("Constellationmap")).define("Constellationmap", _Constellationmap);
  main.variable(observer()).define(["yCounts","Constellation","data"], _6);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","Constellationmap","yCounts"], _8);
  main.variable(observer()).define(["Plot","data","Constellationmap"], _9);
  return main;
}
