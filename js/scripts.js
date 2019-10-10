(function() {
    var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    var countDown = new Date('Oct 20, 2019 00:00:00').getTime(),
        x = setInterval(function() {

            var now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById('days').innerText = Math.floor(distance / (day)),
            document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));

            //do something later when date is reached
            //if (distance < 0) {
            //  clearInterval(x);
            //  'Hello!;
            //}

        }, second)
})();