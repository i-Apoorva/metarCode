
    function getTemp(temperature) {
        console.log({temperature})
        let temp = temperature[temperature.length - 1];
        console.log({temp})
        let tempCelcius =  temp.replace('M', '-');
        let tempFahrenheit = Math.ceil((tempCelcius * 9/5) + 32);  
        let finalTemp = tempCelcius + " C ("  + tempFahrenheit + " F)";
        return finalTemp;
      }
      
      //get wind information in required format
      function getWind(wind){
        wind = wind[wind.length - 1];
        console.log({wind})
        let degree = wind.substring(0,3);
        let knotsValue = wind.includes("G") ? wind.split("G")[1] : wind.split(degree);
        let windVelocity = knotsValue[1].split("KT")[0];
        let windDirection = degreeToDirection(degree);
        let windSpeedMPH = Math.ceil(1.151 * windVelocity);
        let finalWind = windDirection + " at "  + windSpeedMPH + " mph" + " (" + windVelocity + " knots" + ")";
        return finalWind;
      }
      
      //get direction from degree
      function degreeToDirection(degree) {
        let value = Math.floor((degree / 22.5) + 0.5);
        let directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return directions[(value % 16)];
      }

      module.exports ={getTemp, getWind}