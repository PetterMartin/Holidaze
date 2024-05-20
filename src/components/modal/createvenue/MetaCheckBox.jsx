const MetaCheckBox = ({ name, checked, handleChange }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-800 mb-1">{name}</label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          className="mr-2"
        />
      </div>
    );
  };
  
  export default MetaCheckBox;