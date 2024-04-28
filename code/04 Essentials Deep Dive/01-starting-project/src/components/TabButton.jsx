export default function TabButton({ children, ...props}) {
  console.log('TABBUTTON COMPONENT EXECUTING');

  return (
    <li>
      <button {...props}>
        {children}
      </button>
    </li>
  );
}
