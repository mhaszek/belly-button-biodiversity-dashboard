// DEFINE FUNCTIONS //

// Define function which populates Demographic Info box
function buildInfoBox(id, data) {
    // Select metadata for the selected ID
    var filteredMetadata = data.metadata.filter(sample => sample.id === parseInt(id));

    // Get a reference to the demographic info element
    var demographicInfo = d3.select("#sample-metadata");

    // Clear content if exists
    demographicInfo.html("");

    // Add keys and values from the metadata for selected ID into the Info Box
    filteredMetadata.forEach((event) => {
        Object.entries(event).forEach(([key, value]) => {
            demographicInfo.append("p").text(`${key}: ${value}`);
        });
    });
};

// Define function which filters data for the Bar and Bubble Charts
function filterChartData(id, data) {
    // Select samples data for the selected ID
    var filteredSamplesData = data.samples.filter(sample => sample.id === id);
  
    // Initialize an empty array to store info for charts
    var chartData = [];

    // Add samples data to the array  
    for (var j = 0; j < filteredSamplesData[0].sample_values.length; j++) {
      chartData.push({
        sample_values: filteredSamplesData[0].sample_values[j],
        otu_ids: filteredSamplesData[0].otu_ids[j],
        otu_labels: filteredSamplesData[0].otu_labels[j]
      });
    };

    // Return completed array for plot functions
    return chartData;
};

// Define function which creates Horizontal Bar Chart
function buildBarChart(id, data) {
    // Initialize an array with data for selected ID
    var chartData = filterChartData(id, data);

    // Sort the array by sample values in descending order
    var sortedBarChartData= chartData.sort(function compareFunction(a, b) {
      return b.sample_values - a.sample_values;
    });

    // Slice the first 10 objects for plotting
    var slicedBarChartData = sortedBarChartData.slice(0, 10);

    // Reverse the array to accommodate Plotly's defaults
    var reversedBarChartData = slicedBarChartData.reverse();
    
    // Define trace parameters
    var trace = {
        x: reversedBarChartData.map(object => object.sample_values),
        y: reversedBarChartData.map(object => `OTU ${object.otu_ids}`),
        text: reversedBarChartData.map(object => object.otu_labels),
        type: "bar",
        orientation: "h"
    };

    // Assign data for plot
    var plotData = [trace];

    // Define layout parameters
    var layout = {
        title: `<b>TOP 10 Operational Taxonomic Units</b> <br> found in Test Subject ID No ${id}`,
    };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", plotData, layout);
};

// Define function which creates Bubble Chart
function buildBubbleChart(id, data) {
  // Initialize an array with data for selected ID
  var chartData = filterChartData(id, data);
  
  // Define variable for markers' size
  var size = chartData.map(object => object.sample_values);
  
  // Define trace parameters
  var trace = {
      x: chartData.map(object => object.otu_ids),
      y: chartData.map(object => object.sample_values),
      text: chartData.map(object => object.otu_labels),
      mode: 'markers',
      marker: {
          size: size,
          color: chartData.map(object => object.otu_ids),
          colorscale: 'YlGnBu',
          sizeref: 1.25,
      }
  };

  // Assign data for plot
  var plotData = [trace];
  
  // Define layout parameters
  var layout = {
    title: `<b>Operational Taxonomic Units found in Test Subject ID No ${id}</b> <br> Bubble Chart`,
    xaxis: { title: "OTU ID"}
  };

  // Render the plot to the div tag with id "bubble"
  Plotly.newPlot('bubble', plotData, layout);
};

// Define function which handles Test Subject ID chagnes
function optionChanged(id) {

  d3.json("samples.json").then((data) => {

    // Create Demographic Info box for selected ID
    buildInfoBox(id, data);

    // Create Bar Chart for selected ID
    buildBarChart(id, data);

    // Create Gauge Chart for selected ID
    buildGaugeChart(id, data);

    // Create Bubble Chart for selected ID
    buildBubbleChart(id, data);
  });
};


// POPULATE THE PAGE UPON FIRST LOAD //

d3.json("samples.json").then((data) => {
    // Get available Test Subject IDs
    var testSubjectIDs = data.names;

    // Get a reference to the select element
    var selectMenu = d3.select("#selDataset");

    // Populate list of the avaialable options for the Test Subject ID numbers
    testSubjectIDs.forEach(element => {
        selectMenu.append("option").text(element);
    });     
    
    // Get ID number of the first record in the dataset
    var id = data.names[0];

    // Create Demographic Info box for the first record in the dataset
    buildInfoBox(id, data);

    // Create Bar Chart for the first record in the dataset
    buildBarChart(id, data);

    // Create Gauge Chart for the first record in the dataset
    buildGaugeChart(id, data);

    // Create Bubble Chart for the first record in the dataset
    buildBubbleChart(id, data);
});