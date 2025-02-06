export function ToggleButton(props: {
  value: string;
  "aria-label": string;
  selected?: boolean;
  onClick: () => any;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      {...props}
      className={`p-[5px] text-xs   ${
        props.selected ? "bg-gray-100 text-black" : "bg-gray-800 text-white"
      }`}
    >
      {props.children}
    </button>
  );
}
