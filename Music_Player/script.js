        let nowplaying = document.querySelector(".nowplaying");
        let trackart = document.querySelector(".trackart");
        let trackname = document.querySelector(".trackname");
        let trackartist = document.querySelector(".trackartist");

        let playpausebutton = document.querySelector(".playpausetrack");
        let nextbutton = document.querySelector(".nexttrack");
        let previousbutton = document.querySelector(".previoustrack");

        let seekslider = document.querySelector(".seekslider");
        let volumeslider = document.querySelector(".volumeslider");
        let currenttime = document.querySelector(".currenttime");
        let totalduration = document.querySelector(".totalduration");

        let trackindex = 0;
        let isplaying = false;
        let updatetimer;

        let currenttrack = document.createElement('audio');

        let tracklist = [
            {
                name: "Night Owl",
                artist: "Broke For Free",
                image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
            },
              {
                name: "Enthusiast",
                artist: "Tours",
                image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
            },
            {
            name: "Shipping Lanes",
            artist: "Chad Crouch",
            image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
            path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
            },

        ];

        function randomBGcolor() {
            let red = Math.floor(Math.random() * 256) + 64;
            let green = Math.floor(Math.random() * 256) + 64;
            let blue = Math.floor(Math.random() * 256) + 64;

            let bgcolor = `rgb(${red}, ${green}, ${blue})`;
            document.body.style.background = bgcolor;
        }

        function loadtrack(trackindex) {
            clearInterval(updatetimer);
            resetValues();
            currenttrack.src = tracklist[trackindex].path;
            currenttrack.load();

            trackart.style.backgroundImage = `url(${tracklist[trackindex].image})`;
            trackname.textContent = tracklist[trackindex].name;
            trackartist.textContent = tracklist[trackindex].artist;
            nowplaying.textContent = `PLAYING ${trackindex + 1} OF ${tracklist.length}`;

            updatetimer = setInterval(seekupdate, 1000);
            currenttrack.addEventListener("ended", nexttrack);
            randomBGcolor();
        }

        function resetValues() {
            currenttime.textContent = "00:00";
            totalduration.textContent = "00:00";
            seekslider.value = 0;
        }

        function playpausetrack() {
            if (!isplaying) playtrack();
            else pausetrack();
        }

        function playtrack() {
            currenttrack.play();
            isplaying = true;
            playpausebutton.innerHTML = '<i class="fas fa-pause-circle fa-5x"></i>';
        }

        function pausetrack() {
            currenttrack.pause();
            isplaying = false;
            playpausebutton.innerHTML = '<i class="fas fa-play-circle fa-5x"></i>';
        }

        function nexttrack() {
            trackindex = (trackindex + 1) % tracklist.length;
            loadtrack(trackindex);
            playtrack();
        }

        function previoustrack() {
            trackindex = (trackindex - 1 + tracklist.length) % tracklist.length;
            loadtrack(trackindex);
            playtrack();
        }

        function seekto() {
            let seekto = currenttrack.duration * (seekslider.value / 100);
            currenttrack.currentTime = seekto;
        }

        function setvolume() {
            currenttrack.volume = volumeslider.value / 100;
        }

        function seekupdate() {
            let seekposition = 0;
            if (!isNaN(currenttrack.duration)) {
                seekposition = currenttrack.currentTime * (100 / currenttrack.duration);
                seekslider.value = seekposition;

                let currentminutes = Math.floor(currenttrack.currentTime / 60);
                let currentseconds = Math.floor(currenttrack.currentTime % 60);
                let durationminutes = Math.floor(currenttrack.duration / 60);
                let durationseconds = Math.floor(currenttrack.duration % 60);

                currenttime.textContent = `${String(currentminutes).padStart(2, '0')}:${String(currentseconds).padStart(2, '0')}`;
                totalduration.textContent = `${String(durationminutes).padStart(2, '0')}:${String(durationseconds).padStart(2, '0')}`;
            }
        }

        loadtrack(trackindex);