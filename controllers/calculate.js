const axios = require('axios').default;
const {cache, client} = require('../middleware/cache');
const { getTemp, getWind}= require('../util/metar.util');


exports.getStationData = async function(req, res) {
    const scode = req.query.scode;
    const url= `https://tgftp.nws.noaa.gov/data/observations/metar/stations/${scode}.TXT`
    const response = await axios.get(url);

    let resArr = response.data.split('\n')
    let formatDate = resArr[0].split(" ");
    let observationDateTime = formatDate[0] + ' at ' + formatDate[1];

    let otherInfo= resArr[1].split(" ");
    console.log({otherInfo})
    let finalTemp="";
    let temp= otherInfo.find(value => /\//gi.test(value) ).split('/');
    console.log('temp in calc', temp)
    finalTemp =  getTemp(temp[0].split(" "));

    let finalWind = "";
    if(resArr[1].includes("KT")){
        let splitByWind = resArr[1].split("KT");
     finalWind= getWind(splitByWind[0].split(" "));
    }
      
    let stationData = {
      'station': otherInfo[0],
      'last_observation': observationDateTime,
      'temperature': finalTemp,
      'wind': finalWind
    }
    client.setex(scode, 300, JSON.stringify(stationData));

    // res.send({stationData}) 
    res.render('metar', {data: stationData})
}