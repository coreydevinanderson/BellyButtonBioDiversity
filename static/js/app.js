console.log(Object.keys(bb_data));

// names, metadata, samples

console.log(bb_data.names)
console.log(bb_data.metadata)
console.log(bb_data.samples)



// target the  select tag (dropdown menu)
var dropDown = d3.select("select")


// add the IDs to the dropdown


// Most JS sytle loop with arroww function to add names to dropdown
bb_data.names.forEach(name => dropDown.append('option').text(name));


// Event capture for dropdown

dropDown.on("change", populateInfo);



// Function to add the Demographic information then the Plotly Figures

function populateInfo() {

    d3.event.preventDefault();
    
    var inputID = dropDown.property("value");
    console.log(inputID); // Check to make sure it is getting an input ID

    // Add

    // Demographic data to panel.
    var metadata = bb_data.metadata;

    // Have to parseINT(inputID) to match JSON.

    metadata.forEach(function(ind) {
        if (ind.id === parseInt(inputID)) {
            var pBody = d3.select(".panel-body");
            pBody.html("");
            pBody.append("p").text(`ID: ${ind.id}`);
            pBody.append("p").text(`ETHNICITY: ${ind.ethnicity}`);
            pBody.append("p").text(`GENDER: ${ind.gender}`);
            pBody.append("p").text(`AGE: ${ind.age}`);
            pBody.append("p").text(`LOCATION: ${ind.location}`);
            pBody.append("p").text(`BBTYPE: ${ind.bbtype}`);
            pBody.append("p").text(`WFREQ: ${ind.wfreq}`);
        };
    });

    // Add

    // Bar plot

    // **Still need to specify IDs as hover text**

    var samples = bb_data.samples;

    samples.forEach(function(ind) {

        // Grab the IDs
        if (ind.id === inputID) {
            // Grab max of ten
            var otus = ind.otu_ids.slice(0, 10);
            var otus_string = otus.map(item => item.toString());

            console.log(otus_string); // check stringification

            // Grab the first ten sample-values
            var sampleValues10 = ind.sample_values.slice(0,10);
            
            // Set up the bar plot:
        
            var bar_trace = {
                x: sampleValues10,
                y: otus_string,
                type: "bar",
                orientation: "h"
            }

            var bar_data = [trace];

            var bar_layout = {
                title: "Top Bacterial Cultures Found",
                xaxis: {title: "Sample value"},
                yaxis: {title: "OTU IDS", 
                        type: "category", 
                        autorange: "reversed"}
            };

            Plotly.newPlot("bar", bar_data, bar_layout);
        };

        if (ind === inputID) {
           
            // Now the Bubble!

            
            var otu_ids = bb_data.samples[0]["otu_ids"];
            var sample_values = bb_data.samples[0]["sample_values"];
            var otu_labels = bb_data.samples[0]["otu_lables"];
            
            console.log(otu_id);
            console.log(sample_values);
            console.log(otu_labels);

            var bubble_trace = {
                x: otu_id,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                sizeref: 0.5,
                marker: {
                    size = sample_values,
                    sizemode: 'area'
                }
            };

            var bubble_data = [bubble_trace];
    
            var layout = {
                title: 'Bubble Chart',
                xaxis: {title: "Sample ID"},
                yaxis: {title: "Belly Button Taxa"},
                showlegend: false,
                height: 600,
                width: 600
            };

            Plotly.newPlot("bubble", bubble_data bubble_layout);
        };

    });

    
    // console.log(otu_strings);    
    // console.log(sample_values);

    // var trace1 = {
    //     x: otu_strings,
    //     y: sample_values,
    //     text: otu_ids,
    //     mode: 'markers',
    //     marker :{
    //         size: sample_values,
    //         sizemode: 'area'
    //     }
    // };

    // var data = [trace1];

    // var layout = {
    //     title: 'Bubble Chart',
    //     xaxis: {title: "Sample ID"},
    //     yaxis: {title: "Belly Button Taxa", 
    //             type: "category"},
    //     showlegend: false,
    //     height: 600,
    //     width: 600
    // };

    // Plotly.newPlot("bubble", data, layout);

    // Gauge
    

};





