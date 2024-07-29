import { Accessor, Component, Setter, Show } from 'solid-js'
import { DleState } from '../App'

type DleProps = {
  title: string
  description: string
  link: string
  secondary?: boolean
  state: Accessor<DleState>
  setState: Setter<DleState>
  reorganizing: Accessor<boolean>
}
export const DleCard: Component<DleProps> = ({
  title,
  description,
  link,
  secondary,
  state,
  setState,
  reorganizing,
}) => {
  const handleClick = () => {
    setState((prev) => ({ ...prev, [title]: true }))
  }

  const color = secondary ? 'text-sapphire' : 'text-rosewater'
  return (
    <div class="md:w-full max-w-96 flex justify-between items-center">
      <a
        class="p-4 flex flex-col hover:bg-surface0 rounded grow"
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
      <Show when={reorganizing()}>
        <Show when={!secondary}>
          <button
            class="p-2 h-1/2 hover:bg-surface0 rounded opacity-30 grow-0"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                primary: prev.primary.filter((p) => p !== title),
              }))
            }}
          >
            ❌
          </button>
        </Show>
        <Show when={secondary}>
          <button
            class="p-2 h-1/2 hover:bg-surface0 rounded opacity-30 grow-0"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                primary: [...prev.primary, title],
              }))
            }}
          >
            💗
          </button>
        </Show>
      </Show>
    </div>
  )
}
