var express = require('express');
var app = express();

var Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://pub-node1.etherscan.io:8545"));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var address = '0xF82386AF2F08f02d9E962B24298b814fb533E9c6'
  var balance = web3.eth.getBalance(address);
  balance = parseInt(balance.toString(10))

  var token_address = '90F347F3ADCc7DE9f75B9C27f033a599B4dE06F3'
  var token_data = '0x70a08231000000000000000000000000'
  var token_balance = web3.eth.call({to: "0xef488eb06bb4b63ecce38fd8ea2481da06021c0d", data: token_data+token_address})
  token_balance = parseInt(token_balance.toString(10))

  response.render('pages/index',  { address: address, balance:balance, token_balance:token_balance, token_address:token_address});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});