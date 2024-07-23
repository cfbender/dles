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

  return (
    <div>
      <a
        class="md:w-1/2 p-4 flex flex-col hover:bg-surface0"
        href={link}
        target="_blank"
        onClick={handleClick}
      >
        <div class="flex">
          <p class={`text-md text-${secondary ? "sapphire" : "rosewater"}`}>
            {title}
          </p>
          <Show when={state()[title]}>
            <span class="ml-2">✅</span>
          </Show>
        </div>
        <p class="text-sm text-subtext1">{description}</p>
      </a>
    </div>
  );
};
