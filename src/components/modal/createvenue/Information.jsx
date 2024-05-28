import GuestCounter from "../../buttons/GuestCounter";
import MetaCheckBox from "./MetaCheckBox";

const Information = ({ formData, handleGuestChange, handleMetaChange }) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">
      Lodging Details
      </h1>
      <div className="text-sm md:text-base font-light text-neutral-500 mt-2">
      What features does your place offer?
      </div>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col">
          <div className="font-semibold">Guests (required)</div>
          <div className="text-sm text-neutral-500 mb-6">
            How many guests do you allow?
          </div>
        </div>
        <div className="mt-2">
        <GuestCounter onGuestChange={handleGuestChange} />
        </div>
      </div>
      <div>
        <MetaCheckBox
          name="wifi"
          checked={formData.meta.wifi}
          handleChange={handleMetaChange}
        />
        <MetaCheckBox
          name="parking"
          checked={formData.meta.parking}
          handleChange={handleMetaChange}
        />
        <MetaCheckBox
          name="breakfast"
          checked={formData.meta.breakfast}
          handleChange={handleMetaChange}
        />
        <MetaCheckBox
          name="pets"
          checked={formData.meta.pets}
          handleChange={handleMetaChange}
        />
      </div>
    </div>
  );
};

export default Information;
