import { Show } from "solid-js";

export const DleCard = ({
  title,
  description,
  link,
  secondary,
  state,
  setState,
}) => {
  const handleClick = () => {
    setState((prev) => ({ ...prev, [title]: true }));
  };

  const color = secondary ? "text-sapphire" : "text-rosewater";
  return (
    <div class="md:w-full max-w-96 flex justify-between items-center">
      <a
        class="p-4 flex flex-col hover:bg-surface0 rounded"
        href={link}
        target="_blank"
        onClick={handleClick}
      >
        <div class="flex">
          <span class={`text-md ${color}`}>{title}</span>
          <Show when={state()[title]}>
            <span class="ml-2">✅</span>
          </Show>
        </div>
        <p class="text-sm text-subtext1">{description}</p>
      </a>
      <Show when={!secondary}>
        <button
          class="p-2 h-1/2 hover:bg-surface0 rounded opacity-30"
          onClick={() => {
            setState((prev) => ({
              ...prev,
              primary: prev.primary.filter((p) => p !== title),
            }));
          }}
        >
          ❌
        </button>
      </Show>
      <Show when={secondary}>
        <button
          class="p-2 h-1/2 hover:bg-surface0 rounded opacity-30"
          onClick={() => {
            setState((prev) => ({
              ...prev,
              primary: [...prev.primary, title],
            }));
          }}
        >
          💗
        </button>
      </Show>
    </div>
  );
};
