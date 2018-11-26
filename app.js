// select right tool for the job, seems clunky in javascript, try repeat in perl if time.

const {table} = require('table');
const fs = require('fs');

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

let csvDevices = fs.readFileSync(dataPathDevices, 'utf-8');
let csvRegions = fs.readFileSync(dataPathRegions, 'utf-8');


// AR - parse csv data with Papa Parse package
let Papa = require("papaparse/papaparse.min.js");
let resultsDevices = Papa.parse(csvDevices);
let resultsRegions = Papa.parse(csvRegions);
// console.log(resultsDevices.data);
// console.log(resultsRegions.data);

let DevicesDataArray = resultsDevices.data;
let RegionsDataArray = resultsRegions.data;



// ***d.txt*** - Output the percentage of people visiting the page via a mobile phone or a tablet device
// AR - separate and combined percentages (i.e. mobile, tablet, combined mobile+tablet) do per hour and totals (mean of means) at the end?

// parsing text to get ints for device views
let sampleDeviceRecord = DevicesDataArray[2];
let sampleTotalViews = Number.parseInt(sampleDeviceRecord[1]);
let sampleMobileViews = Number.parseInt(sampleDeviceRecord[2]);
let sampleTabletViews = Number.parseInt(sampleDeviceRecord[4]);
let MobilePercentage = ((sampleMobileViews / sampleTotalViews) * 100);
console.log(sampleDeviceRecord);
console.log(sampleTotalViews);
console.log(sampleMobileViews);
console.log(sampleTabletViews);
console.log(`${MobilePercentage.toFixed(2)}%`);


let deviceUsageArray = [];
let deviceTableFileHeader = ["Quarter Hour Period", "mobile view %", "tablet view %", "combined view %"];
deviceUsageArray.push(deviceTableFileHeader);

for (let i = 1; i < DevicesDataArray.length; i++) {
    // AR - start at 2nd record, added header above already, really there should not be hardcoded starting point? Match all rows that contain data instead.

    let totalViews = Number.parseInt(DevicesDataArray[i][1]);
    let mobileViews = Number.parseInt(sampleDeviceRecord[2]);
    let tabletViews = Number.parseInt(sampleDeviceRecord[4]);
    let combinedViews = mobileViews + tabletViews;
    // AR - avoid dividing by zero when calculating percentage, asign zero value instead.
    let mobilePercentage = (totalViews > 0) ? (((mobileViews / totalViews) * 100)): 0;
    let tabletPercentage = (totalViews > 0) ? (((tabletViews / totalViews) * 100)): 0;
    let combinedPercentage = (totalViews > 0) ? (((combinedViews / totalViews) * 100)): 0;

    let deviceUsageTableRow = [DevicesDataArray[i][0], mobilePercentage.toFixed(0), tabletPercentage.toFixed(0), combinedPercentage.toFixed(0)];
    deviceUsageArray.push(deviceUsageTableRow);

    //AR TODO - add summation in loop
}

let dOutput = table(deviceUsageArray);
console.log(dOutput);

fs.writeFile("./finalTextOutput/d-task.txt", dOutput, function(error) {
    if(error) {
        return console.log(error);
    }

    console.log("file d was saved!");
}); 



// ***a.txt*** - Generate a text file containing a table listing the mean number of Total Page Views during each 1-hour period (i.e., 13:00-13:59, 14:00-14:59… etc)
// start with basic slicing of characters, assume time data is fixed format. Can move onto regex later.
// Total views is same for each csv data set (as it should be!), so can use either file, here using region data file.
// go through array of table rows, slice hour and convert to integer, extract total views, put into another array

let hoursAndTotalsArray = [];

for (let i = 0; i < 24; i++) {
    let timeToFilter =  i.toString();
    let miniTotal = 0;
    for (let j = 0; j < RegionsDataArray.length; j++) {
        // AR - should loops be other way round? What if data array is huge?
        
        // console.log(RegionsDataArray[i][0].slice(16,18));
        let hour = RegionsDataArray[j][0].slice(16,18);
        hour = Number.parseInt(hour);
    
        if (hour === i) {
            // HourSpecificArray.push(hour);
            // console.log(hour);

            // AR - now have only the hours we want, extract totals
            miniTotal += Number.parseInt(RegionsDataArray[j][1]);
        }
        
    }
    // console.log(miniTotal);
    let perHourData = {};
    perHourData.hour = i;
    //AR - TODO should add a counter above to see how many data points we have then divide by that below (add check to prvent divide by zero)
    perHourData.meanViewsPerQuarter = (miniTotal / 4).toFixed(0);
    hoursAndTotalsArray.push(perHourData);

}

console.log(hoursAndTotalsArray);

let tableFileData = [];
let tableFileHeader = ["Hour Period", "Average (mean) views"];
tableFileData.push(tableFileHeader);
for (let k = 0; k < hoursAndTotalsArray.length; k++) {

    let tableFileRow = [`${hoursAndTotalsArray[k].hour}:00-${hoursAndTotalsArray[k].hour}:59`, hoursAndTotalsArray[k].meanViewsPerQuarter];
    tableFileData.push(tableFileRow);
}

console.log(tableFileData);

// let HourSpecificArray = []

let aOutput = table(tableFileData);
console.log(aOutput);

fs.writeFile("./finalTextOutput/a-task.txt", aOutput, function(error) {
    if(error) {
        return console.log(error);
    }

    console.log("file a was saved!");
}); 

