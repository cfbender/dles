import { DleCard } from './components/dle-card'
import { Accordion } from './components/accordion'
import { createSignal, createMemo, For, onMount, Switch, Match } from 'solid-js'
import { makePersisted } from '@solid-primitives/storage'
import dles from './dles.json'
import { capitalize, getDate } from './utils'
import { Dle } from './types'

const everyDay: Dle[] = dles.filter(({ primary }) => primary)
export type DleState = { date: string; primary: string[] }

type BeforeInstallPromptEvent = Event & { prompt: () => void }
let deferredPrompt: BeforeInstallPromptEvent

function App() {
  const [state, setState] = makePersisted(
    createSignal<DleState>({
      date: getDate(),
      primary: everyDay.map(({ title }) => title),
    }),
    { name: 'dles-state' }
  )

  const [reorganizing, setReorganizing] = createSignal(false)
  const [installable, setInstallable] = createSignal(false)

  const primary = createMemo<Dle[]>(() => {
    return dles.filter(({ title }) => state().primary.includes(title))
  })

  const secondary = createMemo<Record<string, Dle[]>>(() =>
    dles
      .filter(({ title }) => !primary().some((dle) => dle.title === title))
      .reduce(
        (acc, dle) => ({
          ...acc,
          [dle.category]: [...(acc[dle.category] || []), dle],
        }),

        {}
      )
  )

  const resetDate = () => {
    // clear state on new day
    const now = getDate()
    if (state().date !== now) {
      setState({ date: now, primary: primary().map(({ title }) => title) })
    }
  }

  onMount(() => {
    resetDate()
    if (!state().primary) {
      setState((prev) => ({
        ...prev,
        primary: everyDay.map(({ title }) => title),
      }))
    }
    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      deferredPrompt = e as BeforeInstallPromptEvent
      // Update UI notify the user they can install the PWA
      setInstallable(true)
    })
  })

  setInterval(resetDate, 1_000)

  const handleInstallClick = async () => {
    // Hide the app provided install promotion
    setInstallable(false)
    // Show the install prompt
    deferredPrompt.prompt()
  }

  return (
    <div class="h-full w-full bg-base mb-16 flex flex-col items-center">
      <header class="flex flex-col">
        <h1 class="text-2xl mx-auto mt-8 text-text">the dles.</h1>
        <h3 class="text-md mx-auto mt-2 text-subtext">
          all you need to feel alive.
        </h3>
      </header>
      <div class="container max-w-3xl mt-16 p-8 flex flex-col md:items-center">
        <h2 class="text-xl text-text ml-4 mb-4">every day joints</h2>
        <For each={primary()}>
          {(dle) => (
            <DleCard
              {...dle}
              state={state}
              setState={setState}
              reorganizing={reorganizing}
            />
          )}
        </For>

        <h2 class="text-xl text-text mt-24 ml-4 mb-4">if you're bored</h2>
        <div class="md:w-full ml-4 flex flex-col md:items-center">
          <For each={Object.entries(secondary())}>
            {([category, dles]) => (
              <Accordion title={capitalize(category)}>
                <For each={dles}>
                  {(dle) => (
                    <DleCard
                      secondary={true}
                      {...dle}
                      state={state}
                      setState={setState}
                      reorganizing={reorganizing}
                    />
                  )}
                </For>
              </Accordion>
            )}
          </For>
        </div>
      </div>
      <button
        class="mt-4 p-2 h-1/2 text-sapphire hover:bg-surface0 rounded"
        onClick={() => {
          setReorganizing((prev) => !prev)
        }}
      >
        <Switch>
          <Match when={reorganizing()}>save</Match>
          <Match when={!reorganizing()}>
            don't like my favorites? (click here)
          </Match>
        </Switch>
      </button>
      {installable() && (
        <button
          class="mt-4 p-2 h-1/2 text-sapphire hover:bg-surface0 rounded"
          onClick={handleInstallClick}
        >
          install to your device
        </button>
      )}
    </div>
  )
}

export default App
