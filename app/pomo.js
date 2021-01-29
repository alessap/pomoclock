import document from "document";
import { vibration } from "haptics";
import * as fs from "fs";
import { get2digits } from "./utils";

let pomo_status_path = "pomodoro-status.txt";
let buttonToggle = document.getElementById("buttonToggle");
let short = 5;
let long = 25;

if (fs.existsSync(pomo_status_path)) {
  let text = fs.readFileSync(pomo_status_path, "cbor");
  console.log(" /------ Reading from file1 ------/ ")
  console.log(text);
  var interval = parseInt(text.split("-")[0])  ;
  var intervalid = text.split("-")[1] ;
  var buttonToggleState = text.split("-")[2] ;
} else {
  var buttonToggleState = "active";
}

buttonToggle.addEventListener("click", (evt) => {
  if (buttonToggleState == "active"){
    buttonToggleState = "nonactive"
    //let text = fs.readFileSync(pomo_status_path, "cbor");
    //var interval = parseInt(text.split("-")[0])  ;
    //var intervalid = text.split("-")[1] ;
    //text = interval + "-" + intervalid + "-" + buttonToggleState;
    //fs.writeFileSync(pomo_status_path, text, "cbor");
    vibration.start("bump");
    clearInterval(timer);
  } else {
    buttonToggleState = "active";
    //let text = fs.readFileSync(pomo_status_path, "cbor");
    //var interval = parseInt(text.split("-")[0])  ;
    //var intervalid = text.split("-")[1] ;
    //text = interval + "-" + intervalid + "-" + buttonToggleState;
    //fs.writeFileSync(pomo_status_path, text, "cbor");
    vibration.start("bump");
    timer = setInterval(pomodorotimerfnc, 1000);
  };
  console.log("click");
  console.log("buttonToggleState is: " + buttonToggleState);
});

const pomodorotimer = document.getElementById("pomodorotimerstr");

var starttime = new Date().getTime();
console.log(starttime)
if (fs.existsSync(pomo_status_path)) {
  let text = fs.readFileSync(pomo_status_path, "cbor");
  console.log(" /------ Reading from file2 ------/ ")
  console.log(text);
  var interval = parseInt(text.split("-")[0])  ;
  var intervalid = text.split("-")[1] ;
  var buttonToggleState = text.split("-")[2] ;
} else {
  console.log(" /------ Starting ------/ ")
  var interval =  long * 60 * 1000;
  var intervalid = "long"
  var text = interval + "-" + intervalid + "-" + buttonToggleState;
  fs.writeFileSync(pomo_status_path, text, "cbor");
  console.log(text);
}

function pomodorotimerfnc() {
  var minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((interval % (1000 * 60)) / 1000);

  if (interval < 0) {
      // clearInterval(timer);
      console.log("TIME UP!!");
      if (intervalid == "long") {
          interval =  short * 60 * 1000;
          vibration.start("nudge-max");
          intervalid = "short";
          console.log(intervalid);
          text = interval + "-" + intervalid + "-" + buttonToggleState;
          fs.writeFileSync(pomo_status_path, text, "cbor");
      } else {
          interval =  long * 60 * 1000;
          vibration.start("nudge-max");
          intervalid = "long";
          console.log(intervalid);
          text = interval + "-" + intervalid + "-" + buttonToggleState;
          fs.writeFileSync(pomo_status_path, text, "cbor");
      }
  } else { 
      let pomodorotimerstr = get2digits(minutes) + ":" + get2digits(seconds);
      pomodorotimer.text = pomodorotimerstr;
      interval = interval - 1000;
      text = interval + "-" + intervalid + "-" + buttonToggleState;
      fs.writeFileSync(pomo_status_path, text, "cbor");
  }
}

var timer = setInterval(
  pomodorotimerfnc,
  1000
)