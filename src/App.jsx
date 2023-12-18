
import styles from './App.module.css';
import { createEffect, createSignal, onMount } from 'solid-js'
import { Button, Box, Container } from '@suid/material'
import Player from './components/Player'
import Intro from './components/Intro'
import { Paper } from "@suid/material"
import Mover from './components/Mover'

const playlist = [
  "https://www.youtube.com/watch?v=7g1bliNj4so",
  "https://www.youtube.com/embed/bv8MDqVrRH0",
  "https://www.youtube.com/embed/89_3DgW_7mg",
  "https://www.youtube.com/watch?v=VWmNcRO9tgk",
  "https://www.youtube.com/embed/DsrxbqFo41k",
  "https://www.youtube.com/watch?v=jlpzAvQ8t8s",
  "https://www.youtube.com/watch?v=8-5yLt1gqIo&t=11s",
  "https://www.youtube.com/watch?app=desktop&v=dY_81IszoFk",
  "https://www.youtube.com/watch?v=7KPK5sMar5w"

]


export const [started, start] = createSignal(false)
export const [ytready, setYTReady] = createSignal(false)
export const [showing, show] = createSignal(playlist[1])


function App () {
  let timer

  let index = 0
  function next () {
    index = ++index % playlist.length
    show(playlist[index])
    timer = setTimeout(next, 500)
  }

  function onTap () {
    setYTReady(true)
    if (timer) clearTimeout(timer)
    timer = setTimeout(next, 1500)
  }


  onMount(next)

  return (

    <Container>

      <Paper>
        <Box style={"text-align:left; margin:3em; padding:3em;"}>
          <h1>🤔 Flustered app</h1>
          <i style={"position:relative; top:-2em; left:5em; color:gray"}> for Embodied Labs</i>
          <p></p>
          <Show when={!ytready()}>
            <Intro />
          </Show>
          <Show when={ytready()}>
            <p>Try to stay on the "Cake" experience, by clicking on Tap</p>
            <p>Imagine if this was the rest of your life.</p>
          </Show>
        </Box>
        <Box>
          <Mover>
            <Button variant='outlined' onClick={onTap}>🖐️ TAP</Button>
          </Mover>
        </Box>
        <Box style="text-align:center; padding-bottom:4em">
          <For each={playlist} fallback={<div>Loading...</div>}>
            {(item, i) => <Player id={`player-${i()}`} src={item} ></Player>}
          </For>
        </Box>

      </Paper>
    </Container>

  )
}

export default App;
