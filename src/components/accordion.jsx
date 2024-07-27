import { createSignal, Show } from "solid-js";

export const Accordion = ({ children, title }) => {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="mb-2">
      <button
        class="md:w-3/4 w-full p-4 flex justify-between bg-surface0 hover:bg-surface1 rounded-md"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <h2 class="text-md text-rosewater">{title}</h2>
        <span class="text-rosewater">{open() ? "▲" : "▼"}</span>
      </button>

      <div class="md:w-3/4 w-full">
        <Show when={open()}>{children}</Show>
      </div>
    </div>
  );
};