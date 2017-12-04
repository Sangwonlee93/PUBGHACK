var check = require('../model/check');
var search =function(req,res){
  var id = req.query.id || req.body.id;
  var region = req.query.region || req.body.region;
  var mode = req.query.mode || req.body.mode;
  id = id.trim();
  console.log(req.connection.remoteAddress + '가' + id +' '+ region +' '+ mode +' 로 검색');
  check.checkdata(id,region,mode,function(result){
    res.render('result.ejs',{flag : result['flag'],id:result['id'],per:result['per'],head:result['head'],
  kda:result['kda'],deal:result['deal'],kill:result['kill'],mode:mode,region:region});
  });
};
var home = function(req,res){
  console.log(req.connection.remoteAddress + ' 접속');
  res.render('index.ejs');
};
var detail = function(req,res){
  var id = req.query.id || req.body.id;
  var region = req.query.region || req.body.region;
  var mode = req.query.mode || req.body.mode;
  check.detaildata(id,region,mode,function(result){
      console.log(req.connection.remoteAddress + ' 가' + id + '으로 상세정보' );
      res.render('detail.ejs',{id:id,result:result});
  });

};
module.exports.search =search;
module.exports.home =home;
module.exports.detail = detail;
