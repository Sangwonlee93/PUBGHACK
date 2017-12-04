var Pubg = require('./pubg');
var p = new Pubg();
var check={};
check.checkdata = function(id,region,mode,callback){
  p.recivedata(id,region,mode,function(data){
    var temp = -1;
    var result = {
      'flag': 1,
      'id': id,
      'per' : 0,
      'head' : 0,
      'kda' : 0,
      'deal' : 0,
      'kill' : 0
    };
    if(data['error']){
      callback(result);
    }else{
      var flag = false;
      for(var i=0; i<data['stats'].length;i++){
        if(data['stats'][i]['region']==region&&data['stats'][i]['mode']==mode&&data['stats'][i]['season']=='2017-pre5'){
          flag = true;
          temp = i;
        }
      }
      if(flag){
        result['flag'] =2;
        for(var i =0; i<data['stats'][temp]['stats'].length; i++){
          if(data['stats'][temp]['stats'][i]['label']=='Avg Dmg per Match'){
            result['deal'] = data['stats'][temp]['stats'][i]['value'];
          }else if(data['stats'][temp]['stats'][i]['label']=='Kills Pg'){
            result['kill'] = data['stats'][temp]['stats'][i]['value'];
          }else if(data['stats'][temp]['stats'][i]['label']=='Headshot Kill Ratio'){
            result['head'] = data['stats'][temp]['stats'][i]['value'];
          }else if(data['stats'][temp]['stats'][i]['label']=='K/D Ratio'){
            result['kda'] = data['stats'][temp]['stats'][i]['value'];
          }
        }
        var dealscore = result['deal'];
        if(dealscore<300){
          dealscore =0;
        }else if(dealscore>=700){
          dealscore = 400;
          dealscore = dealscore/400*40+5;
        }else{
          dealscore -= 300;
          dealscore = dealscore/400*40+5;
        }
        var headscore = result['head']*100;
        if(headscore<35){
          headscore =0;
        }else if(headscore>60){
          headscore = 35;
          headscore = headscore/35*20+5;
        }else{
          headscore -=35;
          headscore = headscore/35*20+5;
        }

        var killscore = result['kill'];
        if(killscore < 4){
          killscore =0;
        }else if(killscore >=10){
          killscore =6;
          killscore = killscore/6*10+5;
        }else{
          killscore -=4;
          killscore = killscore/6*10+5;
        }

        var kdascore = result['kda'];

        if(kdascore <5){
          kdascore = 0;
        }else if(kdascore > 10){
          kdascore = 5;
        }else {
          kdascore -=5;
        }
        kdascore = kdascore/5*10;
        result['per'] = dealscore+headscore+killscore+kdascore;
        result['per']=result['per'].toFixed(2);
        callback(result);
      }else{
        callback(result);
      }
    }
  });
}

check.detaildata = function(id,region,mode,callback){
  p.recivedata(id,region,mode,function(data){
    var temp = -1;
    var result = {
      'round' : "", // Rounds Played
      'wins' : "", // Wins
      'top10' : "", // Top 10s
      'lose' : "", // Losses
      'rating' :"", // Rating
      'bestrate' : "", // Best Rating
      'dmg' : "", // Avg Dmg per Match
      'head' : "", // Headshot Kills Pg
      'heal' : "", // Heals Pg
      'kill' : "", // Kills Pg
      'distance' : "", // Move Distance Pg
      'revive' : "", // Revives Pg
      'road' : "", // Road Kills Pg
      'team' : "", // Team Kills Pg
      'survive' : "", // Time Survived Pg
      'long':"" // Longest Kill
    };
    for(var i=0; i<data['stats'].length;i++){
      if(data['stats'][i]['region']==region&&data['stats'][i]['mode']==mode&&data['stats'][i]['season']=='2017-pre5'){
        temp=i;
        break;
      }
    }
    for(var i =0; i<data['stats'][temp]['stats'].length; i++){
      if(data['stats'][temp]['stats'][i]['label']=='Rounds Played'){
        result['round'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Wins'){
        result['wins'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Top 10s'){
        result['top10'] = data['stats'][temp]['stats'][i]['value'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Losses'){
        result['lose'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Rating'){
        result['rating'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Best Rating'){
        result['bestrate'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Avg Dmg per Match'){
        result['dmg'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Headshot Kills Pg'){
        result['head'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Heals Pg'){
        result['heal'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Kills Pg'){
        result['kill'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Move Distance Pg'){
        result['distance'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Revives Pg'){
        result['revive'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Road Kills Pg'){
        result['road'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Team Kills Pg'){
        result['team'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Time Survived Pg'){
        result['survive'] = data['stats'][temp]['stats'][i]['displayValue'];
      }else if(data['stats'][temp]['stats'][i]['label']=='Longest Kill'){
        result['long'] = data['stats'][temp]['stats'][i]['displayValue'];
      }
    }
    callback(result);
  });
}
module.exports = check;
