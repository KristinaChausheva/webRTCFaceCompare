(function() {

    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var canvas1 = null;
    var photo = null;
    var photo1 = null;
    var startbutton = null;
    const arr = []
    let counter = 0
    let compareBtn = null
    let resetBtn = null

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        canvas1 = document.getElementById('canvas1');
        photo = document.getElementById('photo');
        photo1 = document.getElementById('photo1');
        startbutton = document.getElementById('startbutton');

        compareBtn = document.getElementById('compareBtn');
        resetBtn = document.getElementById('resetBtn');

        // console.log(compareBtn);
        compareBtn.style.display = "none";
        resetBtn.style.display = "none";

        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);

                canvas1.setAttribute('width', width);
                canvas1.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(e) {
            if (counter === 0) {
                counter++
                console.log(counter);
                takepicture();
            } else if (counter === 1) {
                counter++
                console.log(counter);
                takepicture1();
                compareBtn.style.display = "block";
                resetBtn.style.display = "block";
                
            }
            
            e.preventDefault();
        }, false);

        resetBtn.addEventListener('click', function(e) {
            clearphoto();
            clearphoto1();
        })
        clearphoto();
        clearphoto1();
    }


    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function clearphoto1() {
        var context1 = canvas1.getContext('2d');
        context1.fillStyle = "#AAA";
        context1.fillRect(0, 0, canvas1.width, canvas1.height);
        var data = canvas1.toDataURL('image/png');
        photo1.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            console.log(photo.src);
        } else {
            clearphoto();
        }
    }
    function takepicture1() {
        var context1 = canvas1.getContext('2d');
        if (width && height) {
            canvas1.width = width;
            canvas1.height = height;
            context1.drawImage(video, 0, 0, width, height);

            var data = canvas1.toDataURL('image/png');
            photo1.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }

    window.addEventListener('load', startup, false);
})();