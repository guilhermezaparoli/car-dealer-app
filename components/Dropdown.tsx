type Options = {
  label: number | string;
  value: number
}
type DropDownProps = {
  label: string;
  options: Options[];
  onChange: (string: string) => void
}

const Dropdown = ({ label, options, onChange }: DropDownProps) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          onChange={(e) => onChange(e.target.value)}
          className="block w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Dropdown;
  