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
            console.log(`Handy washing frequency: ${ind.wfreq}`);

            var wfreq = ind.wfreq;
            console.log(`Say it again: ${wfreq}`);

            var gauge_trace = {
                value: wfreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { 
                        axis: { 
                                range: [null, 9],
                                tickwidth: 2,
                                tickmode: "array", 
                                tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
                                ticktext: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
                              },
                        bar: { color: "darkblue" },
                        bgcolor: "lightgray",
                        }
            };
            
            var gauge_data = [gauge_trace];            
            var gauge_layout = {width: 600, height: 500, xaxis: { range: [null, 9] }};
                
            Plotly.newPlot('gauge', gauge_data, gauge_layout);
            
        };
    });



    // Bar plot and bubble chart

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
            var sampleOTU10 = ind.otu_labels.slice(0, 10);

            console.log(sampleValues10);
            
            // Set up the bar plot:
        
            var bar_trace = {
                x: sampleValues10,
                y: otus_string,
                type: "bar",
                text: sampleOTU10,
                orientation: "h"
            };

            var bar_data = [bar_trace];

            var bar_layout = {
                title: "Top Bacterial Cultures Found",
                xaxis: {title: "Sample value"},
                yaxis: {title: "OTU IDS", 
                        type: "category", 
                        autorange: "reversed"}
            };

            Plotly.newPlot("bar", bar_data, bar_layout);  

            // Bubble Chart with otu_id d on x-axis and sample value for that taxon on the y-axis.
            // Size proportion to sample_value and color gradient mapped to the numeric id (otu_ids).

            var otu_ids = ind.otu_ids;
            var sample_values = ind.sample_values;
            var otu_labels = ind.otu_labels;
            
            console.log(otu_ids);
            console.log(sample_values);
            console.log(otu_labels);
            

            var bubble_trace = {
                    x: otu_ids,
                    y: sample_values,
                    text: otu_labels,
                    mode: 'markers',
                    marker: {
                        size : sample_values,
                        color: otu_ids,
                        sizemode: 'area',
                        sizeref: 0.1
                    }
            };

            var bubble_data = [bubble_trace];
    
            var bubble_layout = {
                title: "Bubble Chart",
                xaxis: {title: "Sample ID"},
                yaxis: {title: "Belly Button Taxa"},
                showlegend: false,
                height: 600,
                width: 600
            };

            Plotly.newPlot("bubble", bubble_data, bubble_layout);

        };
    });
    
};





