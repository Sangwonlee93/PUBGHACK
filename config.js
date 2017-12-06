module.exports = {
  server_port : 3030,
  route_info : [{file : './search', path : '/search',method : 'search', type : 'get'},
                {file : './search', path : '/',method : 'home', type : 'get'},
                {file : './search', path : '/detail',method : 'detail', type : 'get'},
                {file : './search', path : '/compare',method : 'compare', type : 'get'}]
};
