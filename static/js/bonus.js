
function buildGaugeChart(id, data) {
  // Fitler metadata for the selected ID
  var filteredMetadata = data.metadata.filter(sample => sample.id === parseInt(id));

  // Get the Washing Frequency for the selected ID
  var level = filteredMetadata[0].wfreq;;

// Main Gauge Chart code is from the below link with added adjustments as per the comments
// https://www.instructables.com/Showing-Charts-and-Gauges-of-IOT-Device-Data-Using/

  var degrees = 180 - level*20,  // Level multiplied by 20 in order to match the range
      radius = .40;  // Changed pointer length
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

// New end points calculated for the pointer triangle base
  var base_degrees = 90 - level*20,
      base_radius = .034;
  var base_radians = base_degrees * Math.PI / 180;
  var base_x = base_radius * Math.cos(base_radians);
  var base_y = base_radius * Math.sin(base_radians);

// Path adjusted in order to maintain triangle shape of the pointer for the whole range 
  var mainPath = 'M -.0 -0.0 L ',
  pathL = ' L ',
  path_base_X1 = String(0-base_x),
  path_base_Y1 = String(0-base_y),
  pathX = String(x),
  pathY = String(y),
  path_base_X2 = String(base_x),
  path_base_Y2 = String(base_y),
  space = ' ',
  pathEnd = ' Z';

  var path = mainPath.concat( path_base_X1, space, path_base_Y1, pathL, pathX, space, pathY, pathL, path_base_X2, space, path_base_Y2, pathEnd);

  var data = [{ type: 'scatter',
    x: [0], y:[0],
      marker: {size: 12, color:'850000'}, // Changed marker size
      showlegend: false,
      text: level,
      hoverinfo: 'text'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50], // Adjusted values for 9 categories 
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''], // Adjusted values for 9 categories 
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['#85b48a', '#8abb8f', '#8cbf88', '#b7cc92', '#d5e49d', '#e5e7b3', '#e9e6ca', '#f4f1e5','#f8f3ec', '#fff']}, // Changed colors 
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''], // Adjusted values for 9 categories 
    hoverinfo: 'label',
    hole: .4,  // Changed hole size
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
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',  // Changed title
    xaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge', data, layout);
}; 