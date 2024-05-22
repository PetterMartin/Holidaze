const NameAndDescription = ({ formData, handleChange }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800">
        How would you describe your home?
      </h1>
      <div className="font-light text-neutral-500 mt-2 mb-6">
        Short and sweet works best!
      </div>
      <div className="w-full relative mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer"
        />
        <label
          className="
              text-gray-800
        absolute 
        duration-150 
        transform 
        -translate-y-3 
        top-5 
        z-10 
        origin-[0] 
        left-4
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-4
      "
        >
          Title (required)
        </label>
      </div>
      <div className="w-full relative mb-6">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer"
        />
        <label
          className="
              text-gray-00
        absolute 
        duration-150 
        transform 
        -translate-y-3 
        top-5 
        z-10 
        origin-[0] 
        left-4
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-4
      "
        >
          Description (required)
        </label>
      </div>
    </>
  );
};

export default NameAndDescription;
