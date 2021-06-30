# BellyButtonBioDiversity

# Directory Structure:

// BellyButtonBioDiversity

index.html  
samples.json  
README.md 

static/js/app.js  
static/js/bonus.js //not used...bonus written into app.js   

----------------------------------

Belly button biodiversity dashboard

This repository uses Javascript, with D3.js and Plotly to demonstrate a simple dashboard. The data represent counts of unique taxa of micro-organisms found in each subjects' belly button, where 'sample_values' is the count of taxa.

Select a subject ID from the dropdown menu to generate (or change) the figure outputs.

There are three plots: 
  1) a bar plot (counts for up the top 10 most common taxa)
  3) a bubble chart (counts for all taxa found in a subject, with bubble proportional to count),  
  4) a gauge chart (showing how many times a day the subject washes their belly button.

There is also a panel that contains the metadata for each individual.
