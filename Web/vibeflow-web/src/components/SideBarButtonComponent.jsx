
const SideBarButtonComponent = (props) => { // przycisk pozwalajacy na przelaczanie komponentow glownych
  return (
    <button
      type="button"
      className="flex items-center gap-2 text-gray-700 hover:bg-gray-200 rounded-lg py-2 px-4 w-full text-left"
      onClick={() => props.action(props.to)}
    >
      {props.icon}
      <span>{props.text}</span>
    </button>
  );
};

export default SideBarButtonComponent;
