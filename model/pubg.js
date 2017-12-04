var request = require('request');

class Pubg {
  constructor(){
    this.headers={
      'TRN-Api-Key': '8d3653fd-9d84-478f-b731-de61d86239d4',
    };
  }
  recivedata(id,region,mode,callback){
    var options = {
      url: 'https://api.pubgtracker.com/v2/profile/pc/'+id+'?region='+region+'?season=2017-pre5&mode='+mode,
      method:'GET',
      headers:this.headers,
      json: true
    };

    request(options,function(err,res,body){
      callback(body);
    });
  }
}
module.exports = Pubg;
