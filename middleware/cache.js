const redis = require('redis')
const client = redis.createClient(process.env.REDIS_PORT);

// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});

// cache middleware
function cache(req, res, next) {
    let scode = req.query.scode;
    let noCache = req.query.nocache;
  
    if(noCache == "1"){
      next();
    } else{
      client.get(scode, (err, data) => {
        if (err) throw err;
        
        if (data) {
          res.send({ data: JSON.parse(data)});
        } else {
          next();
        }
      });
    }
  }

module.exports= {cache, client}