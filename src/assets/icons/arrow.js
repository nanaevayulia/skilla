export default function Arrow({ direction }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" style={{ transform: `rotate(${direction})` }}>
      <path d="M6 0 0 6l1.41 1.41L6 2.83l4.59 4.58L12 6 6 0Z" />
    </svg>
  );
}
