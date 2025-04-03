const SideBarButtonComponent = (props) => {
  return (
    <button
      type="button"
      className="flex items-start justify-start gap-1 scale-150 cursor-pointer "
      onClick={() => {
        props.action(props.to);
      }}
    >
      {props.icon}
      <span>{props.text}</span>
    </button>
  );
};

export default SideBarButtonComponent;
