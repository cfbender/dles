import { DleCard } from "./components/dle-card";
import { Accordion } from "./components/accordion";
import { createSignal, createMemo, For, onMount } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import dles from "./dles.json";
import { capitalize, getDate } from "./utils";

const everyDay = dles.filter(({ primary }) => primary);

function App() {
  const [state, setState] = makePersisted(
    createSignal({
      date: getDate(),
      primary: everyDay.map(({ title }) => title),
    }),
    { name: "dle-state" },
  );

  const primary = createMemo(() =>
    dles.filter(({ title }) => state().primary.includes(title)),
  );

  const secondary = createMemo(() =>
    dles
      .filter(({ title }) => !primary().some((dle) => dle.title === title))
      .reduce(
        (acc, dle) => ({
          ...acc,
          [dle.category]: [...(acc[dle.category] || []), dle],
        }),

        {},
      ),
  );

  const resetDate = () => {
    // clear state on new day
    const now = getDate();
    if (state().date !== now) {
      setState({ date: now });
    }
  };

  onMount(() => {
    resetDate();
    if (!state().primary) {
      setState((prev) => ({
        ...prev,
        primary: everyDay.map(({ title }) => title),
      }));
    }
  });
  setInterval(resetDate, 1_000);

  return (
    <div class="h-full w-full bg-base mb-16 flex flex-col items-center">
      <header class="flex flex-col">
        <h1 class="text-2xl mx-auto mt-8 text-text">the dles.</h1>
        <h3 class="text-md mx-auto mt-2 text-subtext">
          all you need to feel alive.
        </h3>
      </header>
      <div class="container max-w-3xl mt-16 p-8 flex flex-col">
        <h2 class="text-xl text-text ml-4 mb-4">every day joints</h2>
        <For each={primary()}>
          {(dle) => <DleCard {...dle} state={state} setState={setState} />}
        </For>

        <h2 class="text-xl text-text mt-24 ml-4 mb-4">if you're bored</h2>
        <div class="ml-4">
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
                    />
                  )}
                </For>
              </Accordion>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}

export default App;
