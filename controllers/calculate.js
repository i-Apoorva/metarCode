const axios = require('axios').default;
const {cache, client} = require('../middleware/cache');
const { getTemp, getWind}= require('../util/metar.util');


exports.getStationData = async function(req, res) {
    const scode = req.query.scode;

    const url= `https://tgftp.nws.noaa.gov/data/observations/metar/stations/${scode}.TXT`
    const response = await axios.get(url)
    let resArr = response.data.split('\n')
    let formatDate = resArr[0].split(" ");
    let observationDateTime = formatDate[0] + ' at ' + formatDate[1];
    let otherInfo= resArr[1].split(" ");
    let temp= otherInfo.find(value => /\//gi.test(value) )
    let finalTemp =  getTemp(temp[0].split(" "));
  
    let finalWindFormat;
            if(!resArr[1].includes("KT")){
              finalWindFormat = "";
            }else{
              let splitByWind = resArr[1].split("KT");
              finalWindFormat = getWind(splitByWind[0].split(" "));
            }
      
    stationData = {
      'station': otherInfo[0],
      'last_observation': observationDateTime,
      'temperature': finalTemp,
      'wind': finalWindFormat
    }
    //console.log({finalWindFormat})
    client.setex(scode, 300, JSON.stringify(stationData));
    res.send({stationData})
  
}