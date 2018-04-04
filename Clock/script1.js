var canvas = $("canvas");
canvas.width(384);
canvas.height(180);

var now = new Date();
var base = canvas[0].getContext('2d');
var hour_minute = canvas[1].getContext('2d');
var minute_second = canvas[2].getContext('2d');

var hour = $("#clock-hour");
var minute = $("#clock-minute");
var second = $("#clock-second");

var halfPI = (Math.PI / 2);
var PI2 = Math.PI*2;

var lastSecond = 0;

function update()
{
    now = new Date();
    
    base.clearRect(0,0,384,180);
    hour_minute.clearRect(0,0,384,180);
    minute_second.clearRect(0,0,384,180);
    
    var hourAngle = PI2 * (now.getHours() / 24) - halfPI;
    var minuteAngle = PI2 * (now.getMinutes() / 60) - halfPI;
    var secondAngle = PI2 * (now.getSeconds() / 60) - halfPI;
    
    base.strokeStyle = "#faa61a";
    base.lineWidth = 14;
    
    base.beginPath();
    base.arc(65, 75, 55, -halfPI, hourAngle, false);
    base.stroke();
    
    base.strokeStyle = "#f1592a";
    base.beginPath();
    base.arc(175, 75, 55, -halfPI, minuteAngle, false);
    base.stroke();
    
    base.strokeStyle = "#4f8bc9";
    base.beginPath();
    base.arc(260, 75, 30, - halfPI, secondAngle, false);
    base.stroke();
        
    base.strokeStyle = "#8dc63f";
    base.lineWidth = 7;
    base.beginPath();
    base.arc(260, 75, 20, -halfPI, PI2 * (now.getMilliseconds() / 1000) - halfPI, false);
    base.stroke();

    // ---------------------
    
    
    hour_minute.save();
    
    hour_minute.strokeStyle = "#bf1e2e";
    hour_minute.lineWidth = 14;
    
    hour_minute.beginPath();
    hour_minute.arc(65, 75, 55, -halfPI, hourAngle, false);
    hour_minute.stroke();
    
    hour_minute.globalCompositeOperation = "destination-in";
    
    hour_minute.strokeStyle = "#662d91";
    hour_minute.beginPath();
    hour_minute.moveTo(175, 13);
    hour_minute.arc(175, 75, 62, -halfPI, minuteAngle, false);
    hour_minute.lineTo(175,75);
    hour_minute.fill();
    hour_minute.restore();
    
    minute_second.save();
    
    minute_second.strokeStyle = "#662d91";
    minute_second.lineWidth = 14;
    minute_second.beginPath();
    minute_second.arc(175, 75, 55, -halfPI, minuteAngle, false);
    minute_second.stroke();
    
    minute_second.globalCompositeOperation = "destination-in";
    
    minute_second.strokeStyle = "#4f8bc9";
    minute_second.beginPath();
    minute_second.moveTo(260, 37);
    minute_second.arc(260, 75, 37, -halfPI, secondAngle, false);
    minute_second.lineTo(260,75);
    minute_second.fill();
    
    minute_second.restore();
    
    if(now.getSeconds() != lastSecond)
    {
        lastSecond = now.getSeconds();
        updateClockTimes(now);
    }
    
    requestAnimationFrame(update);
}

function updateClockTimes(now)
{
    hour.text(now.getHours());
    minute.text(now.getMinutes());
    second.text(now.getSeconds());
}

updateClockTimes(new Date());
update();