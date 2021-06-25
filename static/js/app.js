console.log(Object.keys(bb_data));

// names, metadata, samples

console.log(bb_data.names)
console.log(bb_data.metadata)
console.log(bb_data.samples)


var dropDown = d3.select("select")

for (i = 0; i < bb_data.names.length; i++) {
    dropDown.append("option").text(bb_data.names[i]);
};


dropDown.on("change", populateInfo);

function populateInfo() {

    d3.event.preventDefault();
    
    var inputID = dropDown.property("value");

    console.log(inputID);

    // Demographic data
    var metadata = bb_data.metadata;

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

    // Bar plot

    var samples = bb_data.samples;

    samples.forEach(function(ind) {
        if (ind.id === inputID) {
            var otus = ind.otu_ids.slice(0, 10);
            var otus_string = otus.map(function(item){
                return item.toString();
            })

            console.log(otus_string);

            var sampleValues = ind.sample_values.slice(0,10);
            
            var trace = {
                x: sampleValues,
                y: otus_string,
                type: "bar",
                orientation: "h"
            }

            var data = [trace];

            var layout = {
                title: "Top Bacterial Cultures Found",
                xaxis: {title: "Sample value"},
                yaxis: {title: "OTU IDS", 
                        type: "category", 
                        autorange: "reversed"}
            };

            Plotly.newPlot("bar", data, layout);
        };
    });




};





