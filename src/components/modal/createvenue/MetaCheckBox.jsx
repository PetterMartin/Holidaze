const MetaCheckBox = ({ name, checked, handleChange }) => {
  // Define the text based on the name
  let labelText = name === "pets" ? `Can you bring ${name}?` : `Does your venue include ${name}`;

  return (
    <div className="flex justify-between mb-4 md:mb-6 pt-4 md:pt-6 border-t">
      <div>
        <label className="text-sm md:text-base capitalize font-semibold text-gray-800 mb-1">{name}</label>
        <div className="text-xs md:text-sm font-light text-neutral-500">{labelText}</div>
      </div>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-6 w-6 cursor-pointer me-2"
          name={name}
          checked={checked}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default MetaCheckBox;
