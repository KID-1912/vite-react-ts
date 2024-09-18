export default function ColorLabel(props: { name: string; color: string }) {
  return (
    <div className="flex items-center">
      <div className="icon-circle mr-12px" style={{ backgroundColor: props.color }}></div>
      {props.name}
    </div>
  );
}
