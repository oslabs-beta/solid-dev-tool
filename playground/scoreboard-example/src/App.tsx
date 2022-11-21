import {
  createMemo,
  createSignal,
  createComputed,
  onCleanup,
  For,
  onMount,
} from 'solid-js';
import { createStore } from 'solid-js/store';

function App() {
  type NameScore = HTMLInputElement;
  type Players = {players:{name: string, score: number}[]};
  type Player = {name: string, score: number};

  let newName: NameScore , newScore: NameScore;

  //used to define the type of 'ref'
  onMount(() => {
    if (!newName || !newScore) return;
    newName.focus();
    newScore.focus(); 
  });


  //setting state to store an initial list of players
  const [state, setState] = createStore<Players>({
      players: [
        { name: 'Mark', score: 52 },
        { name: 'Troy', score: 2 },
        { name: 'Jenny', score: 1 },
        { name: 'David', score: 8 },
      ],
    }),

    lastPos = new WeakMap(),
    curPos = new WeakMap(),

    getSorted = createMemo((list: any = []) => {
      list.forEach((p:Player, i: number) => lastPos.set(p, i), );
      const newList = state.players.slice().sort((a, b) => {
        if (b.score === a.score) return a.name.localeCompare(b.name); // stabalize the sort
        return b.score - a.score;
      });
      let updated = newList.length !== list.length;
      newList.forEach(
        (p, i) => lastPos.get(p) !== i && (updated = true) && curPos.set(p, i)
      );
      return updated ? newList : list;
    }),


    handleAddClick = () => {
      const name = newName.value,
        score = +newScore.value;
      if (!name.length || isNaN(score)) return;
      setState('players', (p) => [...p, { name: name, score: score }]);
      newName.value = newScore.value = '';
    },


    handleDeleteClick = (player: Player) => {
      const idx = state.players.indexOf(player);
      setState('players', (p) => [...p.slice(0, idx), ...p.slice(idx + 1)]);
    },


    handleScoreChange = (player: Player, { target }: any) => {
      const score = +target.value;
      const idx = state.players.indexOf(player);
      if (isNaN(+score) || idx < 0) return;
      setState('players', idx, 'score', score);
    },

    
    createStyles = (player: Player) => {
      const [style, setStyle] = createSignal();
      createComputed(() => {
        getSorted();
        const offset = lastPos.get(player) * 18 - curPos.get(player) * 18,
          t = setTimeout(() =>
            setStyle({ transition: '250ms', transform: null })
          );
        setStyle({
          transform: `translateY(${offset}px)`,
          transition: null,
        });
        onCleanup(() => clearTimeout(t));
      });
      return style;
    };


  return (
    <div id='scoreboard'>
      <div class='board'>
        <For each={getSorted()}>
          {(player: Player) => {
            const getStyles = createStyles(player),
              { name } = player;
            return (
              <div class='player' style={getStyles()}>
                <div class='name'>{name}</div>
                <div class='score'>{player.score}</div>
              </div>
            );
          }}
        </For>
      </div>
      <form class='admin'>
        <For each={state.players}>
          {(player) => {
            const { name, score } = player;
            return (
              <div class='player'>
                {name}
                <input
                  class='score'
                  type='number'
                  value={score}
                  onInput={[handleScoreChange, player]}
                />
                <button type='button' onClick={[handleDeleteClick, player]}>
                  x
                </button>
              </div>
            );
          }}
        </For>
        <div class='player'>
          <input
            type='text'
            name='name'
            placeholder='New player...'
            ref={newName}
          />
          <input class='score' type='number' name='score' ref={newScore} />
          <button type='button' onClick={handleAddClick}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
