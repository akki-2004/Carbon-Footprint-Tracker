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
        <label className="block font-bold mb-2">How many commute modes did you use today?</label>
        <input
          type="number"
          className="input-box"
          placeholder="Enter number"
          min="1"
          value={selectedModes.length || ""}
          disabled
        />
      </div>

      {/* How did you commute today? */}
      <div className="form-group">
        <label className="block font-bold mb-4">How did you commute today? (Select all that apply)</label>
        {errors["How did you commute today?"] && <p className="text-red-500 text-sm">{errors["How did you commute today?"]}</p>}
        <div className="checkbox-group">
          {Object.keys(transportModes).map((mode) => (
            <label key={mode} className="flex items-center">
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
                className="w-5 h-5 mr-3"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ask distance for each selected mode */}
      {selectedModes.length > 0 && (
        <div className="form-group mt-8">
          <label className="block font-bold mb-2">How far did you travel for each mode?</label>
          {selectedModes.map((mode) => (
            <div key={mode} className="mb-3">
              <label className="block">{`How far did you travel by ${mode}? (km)`}</label>
              <input
                type="number"
                className="input-box"
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
          <label className="block font-bold mb-2">Did you carpool or share a ride today?</label>
          <div className="radio-group space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={carpooled}
                onChange={(e) => handleChange("Did you carpool or share a ride today?", e.target.value)}
                className="w-5 h-5 mr-2"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={!carpooled}
                onChange={(e) => handleChange("Did you carpool or share a ride today?", e.target.value)}
                className="w-5 h-5 mr-2"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      )}

      {/* Show number of people only if they carpooled */}
      {carpooled && (
        <div className="form-group mt-8">
          <label className="block font-bold mb-2">How many people were in your vehicle?</label>
          <input
            type="number"
            className="input-box"
            placeholder="Enter number"
            value={answers["How many people were in your vehicle?"] || ""}
            onChange={(e) => handleChange("How many people were in your vehicle?", parseInt(e.target.value) || "")}
          />
        </div>
      )}
    </div>
  );
}
