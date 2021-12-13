camera=document.getElementById("camera");
Webcam.attach('#camera');
Webcam.set({
height:350,
width:300,
image_format:'png',
png_quality:90
});


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id = "captured_image" src="'+data_uri+'">';
    })
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/C-E5EHtKy/model.json', ModelLoaded);

function ModelLoaded(){
    console.log('Model Loaded!');
}
 
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+prediction_1;
    speak_data_2 = "And the second prediction is"+prediction_2;
    var UtterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(UtterThis);
}


function check(){
    img= document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "peace"){
            document.getElementById("update_emoji").innerHTML = "&#&#9996;;";
        }
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "best"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
    }
}