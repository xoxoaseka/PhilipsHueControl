var username = 'gUXqSnsX15Vl4xTfooDCk7rBjwhbX886GDgj3MtZ'; // HUE bridge username
var url = '172.22.151.148'; // the hub IP address     
var resultDiv;
var lightNumber = 28;
	
function setup() {
  frameRate(1);
  resultDiv = createDiv('Hub response');  // a div for the Hue hub's responses
  resultDiv.position(10, 450);             // position it
 // off = createButton('Off');
 // off.position(10, 10);
 // off.mouseReleased(turnOff);
 // on = createButton('On');
 // on.position(50, 10);
 // on.mouseReleased(turnOn);

  hueControl = createSlider(0, 65280, 0);
  hueControl.position(250, 40);
 
  connect(); // connect to Hue hub; it will show all light states
}

function connect() {
  url = "http://" + url + '/api/' + username + '/lights/';
  httpDo(url, 'GET', getLights);
}

function getLights(result) {
  resultDiv.html(result);
}

function turnOn() {
  var state = {
    on: true
  }
  send(lightNumber, state);
}

function turnOff() {
  var state = {
    on: false
  }
    send(lightNumber, state);
}


function changeImage() {
	var image = document.getElementById('lighbulb');
    if (image.src.match("bulbon")) {
        image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/93927/pic_bulboff.gif";
        turnOff();
    } else {
        image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/93927/pic_bulbon.gif";
        turnOn();
    }
}



function mouseReleased() {
  var hueValue = hueControl.value();
    var state = {
      hue: hueValue,
      sat: 254
    }
    send(lightNumber, state);
}

function send(light, data) {
  var path = url + light + '/state/';
  var content = JSON.stringify(data);
  httpDo(path, 'PUT', content, 'text', getLights);
}
