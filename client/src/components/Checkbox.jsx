export function Checkbox({ label, onChange, checked, disabled }) {
  return (
    <div className="mb-3">
      <input
        className=" mr-2"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label
        className="form-check-label inline-block text-gray-800"
        htmlFor="flexCheckDefault"
      >
        {label}
      </label>
    </div>
  );
}
