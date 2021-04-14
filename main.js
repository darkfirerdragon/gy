var song="";
var rightwrist_x=0;
var rightwrist_y=0;
var leftwrist_x=0;
var leftwrist_y=0;
var rightwrist_score=0;
var leftwrist_score=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,550);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide()
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
    }
function draw(){
image(video,0,0,600,500);
fill("4, 251, 202");
stroke("4, 251, 202 ");
if(leftwrist_score>0.2){
    circle(leftwrist_x,leftwrist_y,40);
circledraw=Number(leftwrist_y);
volume=circledraw/500;
document.getElementById(volume2).innerHTML="volume="+volume;
song.setVolume(volume);
}
if(rightwrist_score>0.2){
    circle(rightwrist_x,rightwrist_y,40);
if(rightwrist_y>0 &&rightwrist_y<=100){
document.getElementById(speed2).innerHTML="speed =0.5X";
song.rate(0.5);
}
 else if(rightwrist_y>100 &&rightwrist_y<=200){
    document.getElementById(speed2).innerHTML="speed =1X";
    song.rate(1);
}
else if(rightwrist_y>200 &&rightwrist_y<=300){
    document.getElementById(speed2).innerHTML="speed =1.5X";
    song.rate(1.5);
}
else if(rightwrist_y>300 &&rightwrist_y<=400){
    document.getElementById(speed2).innerHTML="speed =2X";
    song.rate(2);
}
else if(rightwrist_y>400){
    document.getElementById(speed2).innerHTML="speed =2.5X";
    song.rate(2.5);
}
}
}
function play_music(){
song.play();
song.setVolume(1);
song.rate(1);
}
function modelloaded(){
console.log("posenet is initialised");
}
function gotposes(result){
if(result.length>0){
rightwrist_x=result[0].pose.rightWrist.x;
rightwrist_y=result[0].pose.rightWrist.y;
leftwrist_x=result[0].pose.leftWrist.x;
leftwrist_y=result[0].pose.leftWrist.y;
console.log("rightwrist_x="+rightwrist_x+"rightwrist_y="+rightwrist_y)
console.log("leftwrist_x="+leftwrist_x+"leftwrist_y="+leftwrist_y)
rightwrist_score=result[0].pose.keypoints[10].score;
leftwrist_score=result[0].pose.keypoints[9].score;
console.log("rightwrist_score="+rightwrist_score);
console.log("leftwrist_score="+leftwrist_score);
}
}