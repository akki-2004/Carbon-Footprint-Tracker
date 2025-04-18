export default function EnergyForm({ answers, handleChange, errors, canProceed }) {
  // Utility function to render radio groups
  const renderRadioGroup = (question, name) => (
    <div className="form-group mt-8">
      <label className="block font-bold mb-2">{question}</label>
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
      <div className="radio-group space-x-6">
        {["Yes", "No"].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              value={option}
              checked={answers[name] === option}
              onChange={(e) => handleChange(name, e.target.value)}
              className="w-5 h-5 mr-2"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const acUsed = Number(answers["How many hours did you use the AC today?"]) > 0;

  return (
    <div className="form-container">
      {/* Fan Usage */}
      <div className="form-group mt-8">
        <label className="block font-bold mb-2">How many hours did you use the fan today?</label>
        {errors["How many hours did you use the fan today?"] && (
          <p className="text-red-500 text-sm">{errors["How many hours did you use the fan today?"]}</p>
        )}
        <input
          type="number"
          className="input-box"
          placeholder="Enter hours"
          value={answers["How many hours did you use the fan today?"] || ""}
          onChange={(e) => handleChange("How many hours did you use the fan today?", parseInt(e.target.value) || "")}
        />
      </div>

      {/* AC Usage */}
      <div className="form-group mt-8">
        <label className="block font-bold mb-2">How many hours did you use the AC today?</label>
        {errors["How many hours did you use the AC today?"] && (
          <p className="text-red-500 text-sm">{errors["How many hours did you use the AC today?"]}</p>
        )}
        <input
          type="number"
          className="input-box"
          placeholder="Enter hours"
          value={answers["How many hours did you use the AC today?"] || ""}
          onChange={(e) => handleChange("How many hours did you use the AC today?", parseInt(e.target.value) || "")}
        />
      </div>

      {/* Temperature Setting - Only show if AC was used */}
      {acUsed && (
        <div className="form-group mt-8">
          <label className="block font-bold mb-2">What was the average temperature setting for your AC/heater today?</label>
          {errors["What was the average temperature setting for your AC/heater today?"] && (
            <p className="text-red-500 text-sm">{errors["What was the average temperature setting for your AC/heater today?"]}</p>
          )}
          <input
            type="number"
            className="input-box"
            placeholder="Enter temperature (°C)"
            value={answers["What was the average temperature setting for your AC/heater today?"] || ""}
            onChange={(e) => handleChange("What was the average temperature setting for your AC/heater today?", parseInt(e.target.value) || "")}
          />
        </div>
      )}

      {/* Radio Button Questions */}
      {renderRadioGroup("Did you turn off appliances or devices when not in use?", "Did you turn off appliances or devices when not in use?")}
      {renderRadioGroup("Did you use renewable energy sources today? (e.g., solar panels, wind energy)", "Did you use renewable energy sources today?")}
      {renderRadioGroup("Did you turn off lights or devices in unoccupied rooms today?", "Did you turn off lights or devices in unoccupied rooms today?")}

      
    </div>
  );
}
