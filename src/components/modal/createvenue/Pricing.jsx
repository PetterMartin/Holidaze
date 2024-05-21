const Pricing = ({ formData, handleChange }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Pricing Details</h1>
      <div className="font-light text-neutral-500 mt-2">
        How much do you charge for a night?
      </div>
      <div className="w-full relative my-6">
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
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
          Price (required)
        </label>
      </div>
    </div>
  );
};

export default Pricing;
