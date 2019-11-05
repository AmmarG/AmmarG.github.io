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
            document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

            //do something later when date is reached
            //if (distance < 0) {
            //  clearInterval(x);
            //  'Hello!;
            //}

        }, second)
})();

document.querySelector('.font-resize').addEventListener('click', function(e) {
    [].map.call(document.querySelectorAll('article'), function(el) {
        el.classList.toggle('bigger');
    });
});
window.onload = function() {
    // Variables
    var share = document.querySelector('.teaser-tools');
    var shareTop = share.offsetTop;

    // Functions
    // You can use toggle instead of add/remove
    function shareFixed(e) {
        if (window.scrollY >= shareTop) {
            share.classList.add('is-fixed');
        } else {
            share.classList.remove('is-fixed');
        }
    }
    // Event Listener
    window.addEventListener('scroll', shareFixed);

}