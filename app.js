
// select right tool for the job, seems clunky in javascript, try repeat in perl if time.

const {table} = require('table');

// AR - parse csv data with Papa Parse package
let csvDevices = `Date,Total,Mobile,Computer,Tablet,Unspecified,Smart TV
Mon 15 Oct 2018 13:00:00 GMT, 0,0,0,0,0,0
Mon 15 Oct 2018 13:15:00 GMT, 3094,1501,1178,284,106,25
Mon 15 Oct 2018 13:30:00 GMT, 13072,6377,4461,1641,448,144
Mon 15 Oct 2018 13:45:00 GMT, 15529,8605,4645,1673,467,138
Mon 15 Oct 2018 14:00:00 GMT, 15510,7436,5537,1923,444,170
Mon 15 Oct 2018 14:15:00 GMT, 14189,6816,4972,1743,495,163
Mon 15 Oct 2018 14:30:00 GMT, 13523,6653,4565,1686,477,142
Mon 15 Oct 2018 14:45:00 GMT, 13753,7412,3869,1841,479,152
Mon 15 Oct 2018 15:00:00 GMT, 12667,6516,3733,1781,447,183
Mon 15 Oct 2018 15:15:00 GMT, 12537,6519,3411,1951,483,173
Mon 15 Oct 2018 15:30:00 GMT, 40277,25299,9612,3392,1554,417
Mon 15 Oct 2018 15:45:00 GMT, 51014,30173,14452,4067,1672,647
Mon 15 Oct 2018 16:00:00 GMT, 58279,35010,16329,4591,1743,605
Mon 15 Oct 2018 16:15:00 GMT, 55375,35193,13821,4002,1749,609
Mon 15 Oct 2018 16:30:00 GMT, 55393,35853,12891,4057,1923,669
Mon 15 Oct 2018 16:45:00 GMT, 52935,36119,10239,4131,1873,573
Mon 15 Oct 2018 17:00:00 GMT, 50679,35853,8456,3807,1825,738
Mon 15 Oct 2018 17:15:00 GMT, 53867,40820,7078,3633,1648,688
Mon 15 Oct 2018 17:30:00 GMT, 56724,44837,6277,3415,1580,614
Mon 15 Oct 2018 17:45:00 GMT, 50358,40369,5440,3571,768,210
Mon 15 Oct 2018 18:00:00 GMT, 49819,40263,4778,3839,753,183
Mon 15 Oct 2018 18:15:00 GMT, 46551,38042,4230,3501,679,99
Mon 15 Oct 2018 18:30:00 GMT, 51163,43002,4007,3416,679,59
Mon 15 Oct 2018 18:45:00 GMT, 51042,43262,3761,3370,614,35
Mon 15 Oct 2018 19:00:00 GMT, 46624,37001,5072,3815,687,49
Mon 15 Oct 2018 19:15:00 GMT, 40036,30131,5207,3929,697,72
Mon 15 Oct 2018 19:30:00 GMT, 58986,48397,5620,4226,693,50
Mon 15 Oct 2018 19:45:00 GMT, 62686,51719,5671,4578,672,45
Mon 15 Oct 2018 20:00:00 GMT, 72671,62327,5238,4359,679,68
Mon 15 Oct 2018 20:15:00 GMT, 50038,40208,5014,4108,654,54
Mon 15 Oct 2018 20:30:00 GMT, 23597,13939,4696,4304,615,43
Mon 15 Oct 2018 20:45:00 GMT, 51700,41686,4903,4404,656,51
Mon 15 Oct 2018 21:00:00 GMT, 39437,28150,5443,5097,698,49
Mon 15 Oct 2018 21:15:00 GMT, 26689,15728,4926,5214,722,99
Mon 15 Oct 2018 21:30:00 GMT, 24711,14717,4416,4873,636,69
Mon 15 Oct 2018 21:45:00 GMT, 20408,12173,3548,4074,560,51
Mon 15 Oct 2018 22:00:00 GMT, 18251,11107,3250,3295,531,68
Mon 15 Oct 2018 22:15:00 GMT, 23481,17473,2601,2864,471,71
Mon 15 Oct 2018 22:30:00 GMT, 23285,18090,2201,2531,417,46
Mon 15 Oct 2018 22:45:00 GMT, 16035,11666,1871,2098,355,45`;

let csvRegions = `Date,Total,United Kingdom,North America,Europe,Asia,Australia
Mon 15 Oct 2018 13:00:00 GMT, 0,0,0,0,0,0
Mon 15 Oct 2018 13:15:00 GMT, 3094,2703,146,139,63,20
Mon 15 Oct 2018 13:30:00 GMT, 13072,10610,1135,757,344,118
Mon 15 Oct 2018 13:45:00 GMT, 15529,10643,3524,814,339,106
Mon 15 Oct 2018 14:00:00 GMT, 15510,11682,2414,829,378,93
Mon 15 Oct 2018 14:15:00 GMT, 14189,11137,1711,778,352,90
Mon 15 Oct 2018 14:30:00 GMT, 13523,10399,1728,799,367,99
Mon 15 Oct 2018 14:45:00 GMT, 13753,10053,2317,816,367,65
Mon 15 Oct 2018 15:00:00 GMT, 12667,10136,1162,796,388,67
Mon 15 Oct 2018 15:15:00 GMT, 12537,10059,1130,820,351,54
Mon 15 Oct 2018 15:30:00 GMT, 40277,36603,1371,1450,552,71
Mon 15 Oct 2018 15:45:00 GMT, 51014,46597,1670,1824,591,70
Mon 15 Oct 2018 16:00:00 GMT, 58279,53352,1858,2034,649,79
Mon 15 Oct 2018 16:15:00 GMT, 55375,50177,2120,1989,684,102
Mon 15 Oct 2018 16:30:00 GMT, 55393,50160,2186,2046,616,82
Mon 15 Oct 2018 16:45:00 GMT, 52935,48240,1942,1753,589,90
Mon 15 Oct 2018 17:00:00 GMT, 50679,46396,1722,1720,485,99
Mon 15 Oct 2018 17:15:00 GMT, 53867,50008,1493,1491,461,157
Mon 15 Oct 2018 17:30:00 GMT, 56724,53079,1452,1374,445,158
Mon 15 Oct 2018 17:45:00 GMT, 50358,47537,1217,942,315,167
Mon 15 Oct 2018 18:00:00 GMT, 49819,47144,1198,870,260,166
Mon 15 Oct 2018 18:15:00 GMT, 46551,44086,1024,831,241,190
Mon 15 Oct 2018 18:30:00 GMT, 51163,48940,1020,702,184,143
Mon 15 Oct 2018 18:45:00 GMT, 51042,48912,932,712,165,159
Mon 15 Oct 2018 19:00:00 GMT, 46624,44651,846,670,177,153
Mon 15 Oct 2018 19:15:00 GMT, 40036,38006,863,688,169,152
Mon 15 Oct 2018 19:30:00 GMT, 58986,56810,963,720,145,203
Mon 15 Oct 2018 19:45:00 GMT, 62686,60441,966,760,149,243
Mon 15 Oct 2018 20:00:00 GMT, 72671,70459,926,748,133,242
Mon 15 Oct 2018 20:15:00 GMT, 50038,47923,837,719,119,302
Mon 15 Oct 2018 20:30:00 GMT, 23597,21625,778,706,109,234
Mon 15 Oct 2018 20:45:00 GMT, 51700,49743,791,711,99,247
Mon 15 Oct 2018 21:00:00 GMT, 39437,37476,807,682,116,241
Mon 15 Oct 2018 21:15:00 GMT, 26689,24744,744,713,140,215
Mon 15 Oct 2018 21:30:00 GMT, 24711,22840,824,638,96,209
Mon 15 Oct 2018 21:45:00 GMT, 20408,18624,744,575,144,236
Mon 15 Oct 2018 22:00:00 GMT, 18251,16553,729,529,134,215
Mon 15 Oct 2018 22:15:00 GMT, 23481,22039,642,403,165,173
Mon 15 Oct 2018 22:30:00 GMT, 23285,21907,648,357,146,158
Mon 15 Oct 2018 22:45:00 GMT, 16035,14729,643,256,179,165`;

let Papa = require("papaparse/papaparse.min.js");
let resultsDevices = Papa.parse(csvDevices);
let resultsRegions = Papa.parse(csvRegions);
// console.log(resultsDevices.data);
// console.log(resultsRegions.data);

let DevicesDataArray = resultsDevices.data;
let RegionsDataArray = resultsDevices.data;



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

const fs = require('fs');
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

