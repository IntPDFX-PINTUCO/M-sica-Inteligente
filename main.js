mad = false
mai = false
madx = 100
maix = 0
distanciad = 1000
distanciai = 1000
distanciam = 1000
lista = []
function preload() {
    god = loadSound("Rap God-Eminem.mp3")
    myname = loadSound("Eminem - My Name Is.mp3")
}
function setup() {
    video = createCapture(VIDEO)
    video.hide()
    ia = ml5.poseNet(video, listo)
    ia.on("pose", resultado)
    lista = [god, myname]
    rap = lista[0]
}
function listo() {
    console.log("IA Activada");
}
function resultado(poses) {
    if (poses.length > 0) {
        madp = poses[0].pose.rightWrist.confidence
        maip = poses[0].pose.leftWrist.confidence
        madx = poses[0].pose.rightWrist.x
        maix = poses[0].pose.leftWrist.x
        distanciad = dist(poses[0].pose.rightEar.x, poses[0].pose.rightEar.y, poses[0].pose.rightWrist.x, poses[0].pose.rightWrist.y)
        distanciai = dist(poses[0].pose.leftEar.x, poses[0].pose.leftEar.y, poses[0].pose.leftWrist.x, poses[0].pose.leftWrist.y)
        distanciam = dist(poses[0].pose.rightWrist.x, poses[0].pose.rightWrist.y, poses[0].pose.leftWrist.x, poses[0].pose.leftWrist.y)
        console.log(distanciam);
        if (madp > 0.01) {
            mad = true
            mai = false
        }
        if (maip > 0.01) {
            mai = true
            mad = false
        }
    }
}
function draw() {
    if (mad ||mai||distanciam< 200) {
        next()
    }
        if (mad &&distanciad<200 && !rap.isPlaying()) {
            rap.play()
        }
        if (mai &&distanciai<200 && rap.isPlaying()) {
            rap.pause()
        }
}
function next(){
    rap.stop()
    rap = lista[1]
    rap.play()
}