# BellyButtonBioDiversity

# Directory Structure:

// BellyButtonBioDiversity

index.html  
samples.json  
README.md 

static/js/app.js 

----------------------------------

Belly button biodiversity dashboard

This repository uses Javascript, with D3.js and Plotly to create a simple dashboard. The data represent counts of unique taxa of micro-organisms found in each subjects' belly button, where 'sample_values' is the count of taxa.

Select a subject ID from the dropdown menu to generate (or change) the figure outputs.

There are three plots: 
  1) a bar plot (counts for up the top taxa, max of ten),
  2) a bubble chart (counts for all taxa found in a subject, with bubble size proportional to count),  
  3) a gauge chart (showing how many times a day on averge the subject washed their belly button.

There is also a panel that contains the metadata for each individual.
