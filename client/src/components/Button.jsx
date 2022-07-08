export function Button({ children, onClick, danger, success, csx, small }) {
  const primaryColors = `bg-blue-500 hover:bg-blue-700`;
  const successColors = `bg-green-500 hover:bg-green-700`;
  const dangerColors = `bg-red-500 hover:bg-red-700`;
  const colors = danger ? dangerColors : success ? successColors : primaryColors;
  const sizes = small ? `py-1 px-2 text-xs` : `py-2 px-2 text-base`;
  return (
    <button
      className={`${colors} text-white font-bold ${sizes} rounded w-24 min-w-max ${csx}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
