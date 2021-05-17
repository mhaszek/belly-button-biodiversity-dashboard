
function buildGaugeChart(id, data) {
  // Fitler metadata for the selected ID
  var filteredMetadata = data.metadata.filter(sample => sample.id === parseInt(id));

  // Get the Washing Frequency for the selected ID
  var level = filteredMetadata[0].wfreq;;

// Below Gauge Chart code is from: (minor adjustments added)
// https://www.instructables.com/Showing-Charts-and-Gauges-of-IOT-Device-Data-Using/

  // Trig to calc meter point
  var degrees = 180 - level*20,
      radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var data = [{ type: 'scatter',
    x: [0], y:[0],
      marker: {size: 12, color:'850000'},
      showlegend: false,
      text: level,
      hoverinfo: 'text'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['#85b48a', '#8abb8f', '#8cbf88', '#b7cc92', '#d5e49d', '#e5e7b3', '#e9e6ca', '#f4f1e5','#f8f3ec', '#fff']},
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
    hoverinfo: 'label',
    hole: .4,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    // height: 1000,
    // width: 1000,
    xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge', data, layout);
}; 