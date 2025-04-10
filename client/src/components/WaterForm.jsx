export default function WaterForm({ answers, handleChange, errors, canProceed }) {
  const usesTanker = answers["What was your primary water source today?"] === "Tanker";
  const usedRO = answers["Did you use an RO purifier today?"] === "Yes";

  return (
    <div className="form-container">
      {/* Primary Water Source */}
      <div className="form-group">
        <label className="block font-bold mb-4">What was your primary water source today?</label>
        {errors["What was your primary water source today?"] && (
          <p className="text-red-500 text-sm">{errors["What was your primary water source today?"]}</p>
        )}
        <select
          className="input-box"
          value={answers["What was your primary water source today?"] || ""}
          onChange={(e) => handleChange("What was your primary water source today?", e.target.value)}
        >
          <option value="">Select</option>
          {["Borewell", "Municipal", "Tanker", "Rainwater", "Recycled Water"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Bathing Method */}
      <div className="form-group mt-8">
        <label className="block font-bold mb-2">How did you take a bath today?</label>
        {errors["How did you take a bath today?"] && (
          <p className="text-red-500 text-sm">{errors["How did you take a bath today?"]}</p>
        )}
        <select
          className="input-box"
          value={answers["How did you take a bath today?"] || ""}
          onChange={(e) => handleChange("How did you take a bath today?", e.target.value)}
        >
          <option value="">Select</option>
          {["Shower (short)", "Shower (long)", "Bucket"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Bottled Water Consumption (Only for Tanker users) */}
      {usesTanker && (
        <div className="form-group mt-8">
          <label className="block font-bold mb-2">How many liters of bottled water did you consume today?</label>
          {errors["How many liters of bottled water did you consume today?"] && (
            <p className="text-red-500 text-sm">{errors["How many liters of bottled water did you consume today?"]}</p>
          )}
          <input
            type="number"
            className="input-box"
            placeholder="Enter liters"
            value={answers["How many liters of bottled water did you consume today?"] || ""}
            onChange={(e) =>
              handleChange("How many liters of bottled water did you consume today?", parseInt(e.target.value) || "")
            }
          />
        </div>
      )}

      {/* RO Purifier Usage */}
      <div className="form-group mt-8">
        <label className="block font-bold mb-2">Did you use an RO purifier today?</label>
        {errors["Did you use an RO purifier today?"] && (
          <p className="text-red-500 text-sm">{errors["Did you use an RO purifier today?"]}</p>
        )}
        <div className="radio-group space-x-6">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                value={option}
                checked={answers["Did you use an RO purifier today?"] === option}
                onChange={(e) => handleChange("Did you use an RO purifier today?", e.target.value)}
                className="w-5 h-5 mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reuse of RO Rejected Water (Only if RO was used) */}
      {usedRO && (
        <div className="form-group mt-8">
          <label className="block font-bold mb-2">If yes, did you reuse the rejected water?</label>
          {errors["If yes, did you reuse the rejected water?"] && (
            <p className="text-red-500 text-sm">{errors["If yes, did you reuse the rejected water?"]}</p>
          )}
          <div className="radio-group space-x-6">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  value={option}
                  checked={answers["If yes, did you reuse the rejected water?"] === option}
                  onChange={(e) => handleChange("If yes, did you reuse the rejected water?", e.target.value)}
                  className="w-5 h-5 mr-2"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      
    </div>
  );
}
