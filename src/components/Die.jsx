export default function Die(props) {
  return (
    <button
      className={props.isHeld ? 'die is-held' : 'die'}
      onClick={() => props.hold(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${
        props.isHeld ? 'held' : 'not held'
      }`}
    >
      {props.value}
    </button>
  );
}
