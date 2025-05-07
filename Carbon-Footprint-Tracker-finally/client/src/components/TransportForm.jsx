import { emissionConfig } from '../utils/emissionConfig';

export default function TransportForm({ answers, handleChange, errors }) {
  const transportModes = emissionConfig.transportation.modes;
  const selectedModes = answers["How did you commute today?"] || [];
  const usedPrivateVehicle = selectedModes.some(mode =>
    ["Petrol Bike", "Electric Bike", "Petrol Car", "Diesel Car", "CNG Car", "EV"].includes(mode)
  );
  const carpooled = answers["Did you carpool or share a ride today?"] === "Yes";

  return (
    <div className="form-container">
      {/* Question: How many commute modes did you use today? */}
      <div className="form-group">
        <label className="block font-bold text-2xl mb-4 text-center text-white">How many commute modes did you use today?</label>
        <input
          type="number"
          className="input-box text-lg p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter number"
          min="1"
          value={selectedModes.length || ""}
          disabled
        />
      </div>

      {/* How did you commute today? */}
      <div className="form-group">
        <label className="block font-bold text-2xl mb-4 text-center text-white">How did you commute today? (Select all that apply)</label>
        {errors["How did you commute today?"] && <p className="text-red-500 text-lg">{errors["How did you commute today?"]}</p>}
        <div className="checkbox-group">
          {Object.keys(transportModes).map((mode) => (
            <label key={mode} className="flex items-center text-white text-lg mb-3">
              <input
                type="checkbox"
                value={mode}
                checked={selectedModes.includes(mode)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...selectedModes, mode]
                    : selectedModes.filter((m) => m !== mode);
                  handleChange("How did you commute today?", updated);
                }}
                className="w-6 h-6 mr-4"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ask distance for each selected mode */}
      {selectedModes.length > 0 && (
        <div className="form-group mt-8">
          <label className="block font-bold text-2xl mb-4 text-center text-white">How far did you travel for each mode?</label>
          {selectedModes.map((mode) => (
            <div key={mode} className="mb-5">
              <label className="block text-white text-xl">{`How far did you travel by ${mode}? (km)`}</label>
              <input
                type="number"
                className="input-box text-lg p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter km for ${mode}`}
                value={answers[`Distance traveled by ${mode}`] || ""}
                onChange={(e) =>
                  handleChange(`Distance traveled by ${mode}`, parseFloat(e.target.value) || "")
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Show carpooling question only if a private vehicle was used */}
      {usedPrivateVehicle && (
        <div className="form-group mt-8">
          <label className="block font-bold text-2xl mb-4 text-center text-white">Did you carpool or share a ride today?</label>
          <div className="radio-group space-x-6">
            <label className="flex items-center text-white text-lg">
              <input
                type="radio"
                value="Yes"
                checked={carpooled}
                onChange={(e) => handleChange("Did you carpool or share a ride today?", e.target.value)}
                className="w-6 h-6 mr-2"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center text-white text-lg">
              <input
                type="radio"
                value="No"
                checked={!carpooled}
                onChange={(e) => handleChange("Did you carpool or share a ride today?", e.target.value)}
                className="w-6 h-6 mr-2"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      )}

      {/* Show number of people only if they carpooled */}
      {carpooled && (
        <div className="form-group mt-8">
          <label className="block font-bold text-2xl mb-4 text-center text-white">How many people were in your vehicle?</label>
          <input
            type="number"
            className="input-box text-lg p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number"
            value={answers["How many people were in your vehicle?"] || ""}
            onChange={(e) => handleChange("How many people were in your vehicle?", parseInt(e.target.value) || "")}
          />
        </div>
      )}
    </div>
  );
}
