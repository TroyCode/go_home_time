const HOUR = 3600
const MINUTE = 60
const DAY = 24*HOUR

// URL parameter
const url = new URL(location.href)
const HH = url.searchParams.get("hh") || 18
const MM = url.searchParams.get("mm") || 0
const FI = url.searchParams.get("fadein")

var blink_flag = true

function timer() {

    // Time parameter
    var time = new Date()
    var now_time = time.getHours()*HOUR + time.getMinutes()*MINUTE + time.getSeconds()
    var go_home_time = HH*HOUR + MM*MINUTE
    let go_work_time = go_home_time - 9*HOUR
    var less_time = go_home_time - now_time // left_time
    var lunch = 12*HOUR

    let opacity = 1 - less_time/(9*HOUR)

    let marquee_taken = false

    let audio = new Audio('public/mp3/ding/Ding-sound-three-times.mp3')

    // Process work off timer
    if (less_time < 0) {
        marquee_taken = true
        less_time = DAY + go_work_time - now_time
        opacity = 1 - less_time/(15*HOUR)
        document.getElementById("demo1").style.color = "#00ff00"
        document.getElementById("seafood").innerHTML = ('回家洗洗睡') 
    }

    // Lunch notification
    if (now_time > (lunch - 5*MINUTE) && now_time < (lunch + 15*MINUTE)) {
        if (now_time < lunch + 1) {
            audio.play()
        }
        marquee_taken = true
        document.getElementById("seafood").innerHTML = ('準備吃飯囉！') 
    }

    // Work off alert
    if (less_time < 5*MINUTE) {
        if (less_time > 5*MINUTE - 2) {
            audio.play()
        }

        if (blink_flag) {
            document.getElementById("demo1").style.color = "red"
            blink_flag = false
        }
        else {
            document.getElementById("demo1").style.color = "rgba(0, 0, 0, 0)"
            blink_flag = true
        }
    } 

    // Deal with point number
    hours = Math.floor(less_time/HOUR)
    minutes = Math.floor(less_time/MINUTE%MINUTE)
    seconds = Math.floor(less_time%MINUTE%MINUTE)

    // Display left time
    var out = (hours < 10 ? '0' : '') + hours + ":" + 
              (minutes < 10 ? '0' : '') + minutes + ":" + 
              (seconds < 10 ? '0' : '') + seconds
    document.getElementById("demo1").innerHTML = out
    console.log(FI)
    if (FI != 'disable') {
        document.getElementById("demo1").style.opacity = opacity
    } else {
        document.getElementById("demo1").style.opacity = 1
    }

    // Marquee
    if (!marquee_taken) {
        if (seconds%4 < 2) {
            document.getElementById("seafood").innerHTML = "感恩Cliff"
        } else {
            document.getElementById("seafood").innerHTML = "讚嘆Christine"
        }
    }
}

var time_to_ = setInterval(timer, 500)

