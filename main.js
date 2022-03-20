LeftwristX = 0;
LeftwristY = 0;
RightwristX = 0;
RightwristY = 0;
LeftwristYwhole = 0;
LeftwristXwhole = 0;
RightwristXwhole = 0;
RightwristYwhole = 0;
leftWristscore = 0;
sound = "";

function preload() {
    sound = loadSound("music.mp3");
}

function setup() {
    mycanvas = createCanvas(650, 400);
    mycanvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenetmodel = ml5.poseNet(video, modelloaded);
    posenetmodel.on("pose", getResults);

}


function modelloaded() {
    console.log("Posenet has loaded");
}

function draw() {
    image(video, 0, 0, 650, 400);
    stroke("purple");
    fill("pink");
    circle(LeftwristX, LeftwristY, 25);
    circle(RightwristX, RightwristY, 25);

    if (RightwristY > 0 && RightwristY <= 100) {
        sound.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed: 0.5X";
    }

    if (RightwristY > 100 && RightwristY <= 200) {
        sound.rate(1);
        document.getElementById("speed").innerHTML = "Speed: 1X";
    }

    if (RightwristY > 200 && RightwristY <= 300) {
        sound.rate(1.5);
        document.getElementById("speed").innerHTML = "Speed: 1.5";
    }

    if (RightwristY > 300 && RightwristY <= 400) {
        sound.rate(2);
        document.getElementById("speed").innerHTML = "Speed: 2X";
    }

    if (leftWristscore > 0.2) {
        volume = LeftwristYwhole / 500;
        document.getElementById("volume").innerHTML = "Volume: " + volume;
        sound.setVolume(volume);
    }
}


function playSong() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}

function getResults(resultsarray) {
    if (resultsarray.length > 0) {
        console.log(resultsarray);
        LeftwristX = Number(resultsarray[0].pose.leftWrist.x);
        LeftwristXwhole = floor(LeftwristX);
        LeftwristY = Number(resultsarray[0].pose.leftWrist.y);
        LeftwristYwhole = floor(LeftwristY);
        RightwristX = Number(resultsarray[0].pose.leftWrist.x);
        RightwristXwhole = floor(RightwristX);
        RightwristY = Number(resultsarray[0].pose.leftWrist.y);
        RightwristYwhole = floor(RightwristY);
        leftWristscore = resultsarray[0].pose.keypoints[9].score;
    }
}