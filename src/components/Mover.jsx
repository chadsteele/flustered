import $ from 'jQuery'


import { onMount } from 'solid-js'

function makeNewPosition () {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function calcSpeed (prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.05;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;

}



export default function (props) {
    let ref

    function animateDiv () {
        const $ref = $(ref)
        var newq = makeNewPosition();
        var oldq = $ref.offset()
        var speed = calcSpeed([oldq.top, oldq.left], newq);

        $ref.animate({ top: newq[0], left: newq[1] }, speed, function () {
            animateDiv();
        });
    };

    onMount(animateDiv)

    return <div ref={ref} style="position:fixed">
        {props.children}
    </div>
}