var express = require('express');
var app = express();
var moment = require('moment');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/:id', function(req, res) {
     var formats = [
    'X',
    'MM-DD-YYYY',
    'MM-DD-YY',
    'M-D-YYYY',
    'M-D-YY',
    'MMMM D YYYY',
    'MMM D YYYY',
    'D MMMM YYYY',
    'D MMM YYYY',
  ];
    var dateEntered = req.params.id;
    var date = moment(dateEntered, formats);
    var unix = null;
    var natural = null;

    if(!date.isValid()){
        res.send({unix: unix, natural: natural});
    } else {
        unix = date.unix();
        natural = date.format('MMMM D, YYYY');
        res.send({unix: unix, natural: natural});
    }
});

app.listen(app.get('port'), function() {
    console.log('Timestamp Service app is running on port', app.get('port'));
});