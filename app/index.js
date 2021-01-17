import clock from "clock";
import document from "document";

// Tick every second
clock.granularity = "seconds";
const months = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun",
  "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec"
];
const weekdays = [
  "Sun",
  "Mon", "Tue","Wed",
  "Thu", "Fri", "Sat"
];
const datestr = document.getElementById("datestr");
const digitalclockstr = document.getElementById("digitalclockstr");

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

function get2digits(number) {
  if (number.toString().length == 1) {
    number = "0" + number.toString();
  }
  return number.toString();
}

// Rotate the hanids every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  let customdatestr = (
    weekdays[today.getDay()] + " " 
    + today.getDate() + " " 
    + months[today.getMonth()]
    );
  
  let hours2digits = get2digits(today.getHours());
  let minutes2digits = get2digits(today.getMinutes());
  let digitalclock = hours2digits + ":" + minutes2digits;
  
  datestr.text = customdatestr;
  digitalclockstr.text = digitalclock;
  
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);
