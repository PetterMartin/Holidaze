const NameAndDescription = ({ formData, handleChange }) => {
    return (
        <>
          <p className="font-semibold text-gray-700 ms-2">Name of venue</p>
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
              text-gray-400
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
              Name of venue
            </label>
          </div>
          <p className="font-semibold text-gray-700 ms-2">Description</p>
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
              text-gray-400
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
              What best describes your home?
            </label>
          </div>
        </>
      );
    };

export default NameAndDescription