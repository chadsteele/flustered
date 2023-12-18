import { createEffect, createSignal, onMount } from 'solid-js'

import { ytready, showing } from '../App'

export default function Player (props) {
    const { id, src, auto, mute } = props
    let ref, player, ready = false

    const vid = src.match(/[a-zA-Z0-9_-]{11}/)[0]
    createEffect(() => {
        if (ytready()) {
            player = new YT.Player(id, {
                videoId: vid,
                playerVars: {
                    playlist: vid,
                    'controls': 0,
                    'showinfo': 0,
                    'rel': 0,
                    'loop': 1,
                    'autohide': 1,
                    'cc_load_policy': 0,
                    'disablekb': 1,
                    'iv_load_policy': 3,
                    'modestbranding': 1,
                    'm': 0
                },
                events: {
                    'onReady': (event) => {
                        ready = true
                        player.setVolume(5);
                        player.playVideo();
                    },
                }
            });
            ref = document.getElementById(id)
        }
    })

    createEffect(() => {

        if (!ytready()) return
        if (showing() == src) {
            ref.style.display = 'inline'
            if (ready) player?.setVolume(100);
        } else {
            ref.style.display = 'none'
            if (ready) player?.setVolume(5);
        }
    })

    return <div id={id} src={src} />
}
