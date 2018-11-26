// AR - select right tool for the job, seems clunky in javascript, try repeat in perl if time.

// AR - using table package from npm , papa parse & nodejs filesystem tools
const {table} = require('table');
const fs = require('fs');
let Papa = require("papaparse/papaparse.min.js");

let dataPathDevices = './data/article-Devices.csv'
let dataPathRegions = './data/article-Regions.csv'


//AR - can use async version of readFile method for more complex situations, trigger processing and file writing from callback function
// fs.readFile(dataPath1, {encoding: 'utf-8'}, function(error ,data){
//     if (error) {
//         console.log(err);
//     } else {
//         console.log('received data: ' + data);
//     }
// });

let csvDevicesFull = fs.readFileSync(dataPathDevices, 'utf-8');
console.log("reading hourly device data from ./data/article-Devices.csv");

let csvRegionsFull = fs.readFileSync(dataPathRegions, 'utf-8');
console.log("reading hourly region data from ./data/article-Regions.csv");

let csvDevices = csvDevicesFull.trim();
let csvRegions = csvRegionsFull.trim();

// AR - parse csv data with Papa Parse package
let resultsDevices = Papa.parse(csvDevices);
let resultsRegions = Papa.parse(csvRegions);

let devicesDataArray = resultsDevices.data;
let regionsDataArray = resultsRegions.data;


// ***d.txt*** - Output the percentage of people visiting the page via a mobile phone or a tablet device
// AR - separate and combined percentages (i.e. mobile, tablet, combined mobile+tablet), do per hour and totals (mean of means) at the end?

let deviceUsageArray = [];
let deviceTableFileHeader = ["Quarter Hour Period", "mobile view (%)", "tablet view (%)", "combined mobile+tablet (%)"];
deviceUsageArray.push(deviceTableFileHeader);

for (let i = 1; i < devicesDataArray.length; i++) {
    // AR - start at 2nd record, added header above already, really there should not be hardcoded starting point? Ideally match all rows that contain data instead.
    let totalViews = Number.parseInt(devicesDataArray[i][1]);
    let mobileViews = Number.parseInt(devicesDataArray[i][2]);
    let tabletViews = Number.parseInt(devicesDataArray[i][4]);
    let combinedViews = mobileViews + tabletViews;

    // AR - avoid dividing by zero when calculating percentage, asign zero value instead.
    let mobilePercentage = (totalViews > 0) ? (mobileViews / totalViews * 100) : 0;
    let tabletPercentage = (totalViews > 0) ? (tabletViews / totalViews * 100) : 0;
    let combinedPercentage = (totalViews > 0) ? (combinedViews / totalViews * 100) : 0;

    let deviceUsageTableRow = [devicesDataArray[i][0], mobilePercentage.toFixed(1), tabletPercentage.toFixed(1), combinedPercentage.toFixed(1)];
    deviceUsageArray.push(deviceUsageTableRow);
}

let dOutput = table(deviceUsageArray);
// console.log(dOutput);

fs.writeFile("./finalTextOutput/d-task.txt", dOutput, function(error) {
    if(error) {
        return console.log(error);
    }
    console.log("task d output file was saved to ./finalTextOutput/d-task.txt!");
}); 



// ***a.txt*** - Generate a text file containing a table listing the mean number of Total Page Views during each 1-hour period (i.e., 13:00-13:59, 14:00-14:59… etc)
// Start with basic slicing of characters, assume time data is fixed format. Can move onto regex in future.
// Total views is same for each csv data set (as it should be!), so can use either file, here using region data file.

let hoursAndTotalsArray = [];

for (let i = 0; i < 24; i++) {
    // AR - effectively, for each hour of the day, go through the data and find rows that match that hour, then keep a running total of views.
    let miniTotal = 0;
    let matchingDataRows = 0;
    for (let j = 0; j < regionsDataArray.length; j++) {
    // AR - would probably adapt this if data array was huge, extract hour and directly add to an object key for that specific hour, rather than looping and testing.

        // AR - extract hour of the day e.g. '17', '20', '23' from first element of each row of region data.
        let hour = regionsDataArray[j][0].slice(16,18);
        hour = Number.parseInt(hour);
    
        if (hour === i) {
            matchingDataRows++;
            // AR - now have only the hours we want, extract totals
            miniTotal += Number.parseInt(regionsDataArray[j][1]);
        }
        
    }
    let perHourData = {};
    perHourData.hour = i;
    //AR - have a counter above to see how many data points we have then divide by that below (add check to prevent divide by zero)
    if (matchingDataRows) {
        perHourData.meanViewsPerQuarter = (miniTotal / matchingDataRows).toFixed(0);
    } else {
        // AR - if we have no data for a certain hour slot, table can show "-" or "N/A"
        perHourData.meanViewsPerQuarter = "-";
    }
    hoursAndTotalsArray.push(perHourData);
}

let tableFileData = [];
let tableFileHeader = ["Hour Period", "Average (mean) views"];
tableFileData.push(tableFileHeader);
for (let k = 0; k < hoursAndTotalsArray.length; k++) {
    let tableFileRow = [`${hoursAndTotalsArray[k].hour}:00-${hoursAndTotalsArray[k].hour}:59`, hoursAndTotalsArray[k].meanViewsPerQuarter];
    tableFileData.push(tableFileRow);
}

let aOutput = table(tableFileData);
// console.log(aOutput);

fs.writeFile("./finalTextOutput/a-task.txt", aOutput, function(error) {
    if(error) {
        return console.log(error);
    }
    console.log("task a output file was saved to ./finalTextOutput/a-task.txt!");
}); 
