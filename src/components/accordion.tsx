import { createSignal, ParentComponent, Show } from 'solid-js'

export const Accordion: ParentComponent<{ title: string }> = ({
  children,
  title,
}) => {
  const [open, setOpen] = createSignal(false)
  return (
    <div class="md:w-3/4 w-full mb-2">
      <button
        class="w-full p-4 flex justify-between bg-surface0 hover:bg-surface1 rounded-md"
        onClick={() => {
          setOpen((prev) => !prev)
        }}
      >
        <h2 class="text-md text-rosewater">{title}</h2>
        <span class="text-rosewater">{open() ? '▲' : '▼'}</span>
      </button>

      <Show when={open()}>
        <div class="md:w-3/4 w-full md:mx-auto p-2">{children}</div>
      </Show>
    </div>
  )
}
