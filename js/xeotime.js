function liveNotif() {
    fetch("https://decapi.me/twitch/uptime/xeokn/?offline_msg=notstreaming")
        .then(resp => resp.text())
        .then(status => {
            if (status != "notstreaming") {
                //LIVE
                document.querySelector(".live-notif").style.visibility = "visible";
            } else {
                //Not live, Go touch grass or something.
                document.querySelector(".live-notif").style.visibility = "hidden";
            }
        });
};

liveNotif();
const liveCheck = setInterval(liveNotif, 60000)
