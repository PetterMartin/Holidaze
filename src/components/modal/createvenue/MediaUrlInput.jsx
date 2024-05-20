const MediaUrlInput = ({ mediaUrl, handleChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-neutral-800 mb-1">Image URL</label>
      <input
        type="text"
        name="mediaUrl"
        value={mediaUrl}
        onChange={handleChange}
        required
        className="w-full border-gray-300 rounded-md shadow-sm focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
      />
    </div>
  );
};

export default MediaUrlInput;
