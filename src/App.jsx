import { DleCard } from "./components/dle-card";
import { Accordion } from "./components/accordion";
import { createSignal, For, onMount } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import dles from "./dles.json";
import { capitalize, getDate } from "./utils";

const everyDay = dles.filter(({ primary }) => primary);

const secondary = dles
  .filter(({ primary }) => !primary)
  .reduce(
    (acc, dle) => ({
      ...acc,
      [dle.category]: [...(acc[dle.category] || []), dle],
    }),

    {},
  );

function App() {
  const [state, setState] = makePersisted(createSignal({ date: getDate() }));

  const resetDate = () => {
    // clear state on new day
    const now = getDate();
    if (state().date !== now) {
      setState({ date: now });
    }
  };

  onMount(resetDate);
  setInterval(resetDate, 1_000);

  return (
    <div class="h-100 w-100 bg-base mb-16">
      <header class="flex flex-col">
        <h1 class="text-2xl mx-auto mt-8 text-text">the dles.</h1>
        <h3 class="text-md mx-auto mt-2 text-subtext">
          all you need to feel alive.
        </h3>
      </header>
      <div class="container mx-auto mt-16 flex-col">
        <h2 class="text-xl text-text ml-4 mb-4">every day joints</h2>
        <For each={everyDay}>
          {(dle) => <DleCard {...dle} state={state} setState={setState} />}
        </For>

        <h2 class="text-xl text-text ml-4 mt-24 mb-4">if you're bored</h2>
        <For each={Object.entries(secondary)}>
          {([category, dles]) => (
            <Accordion title={capitalize(category)}>
              <For each={dles}>
                {(dle) => (
                  <DleCard
                    secondary={true}
                    {...dle}
                    state={state}
                    setState={setState}
                  />
                )}
              </For>
            </Accordion>
          )}
        </For>
      </div>
    </div>
  );
}

export default App;
