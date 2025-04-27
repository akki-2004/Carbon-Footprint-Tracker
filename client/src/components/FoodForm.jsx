export default function FoodForm({ answers, handleChange, errors, canProceed }) {
  const isNonVeg = answers["What kind of meals did you have today?"] === "Non-Vegetarian";
  const orderedFood = answers["Did you order food online today?"] === "Yes";

  return (
    <div className="form-container">
      {/* What kind of meals did you have today? */}
      <div className="form-group">
        <label className="block font-bold mb-4">What kind of meals did you have today?</label>
        {errors["What kind of meals did you have today?"] && (
          <p className="text-red-500 text-sm">{errors["What kind of meals did you have today?"]}</p>
        )}
        <select
          className="input-box"
          value={answers["What kind of meals did you have today?"] || ""}
          onChange={(e) => handleChange("What kind of meals did you have today?", e.target.value)}
        >
          <option value="">Select</option>
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
          <option>Vegan</option>
        </select>
      </div>

      {/* If non-veg, what did you consume? */}
      {isNonVeg && (
        <div className="form-group mt-8">
          <label className="block font-bold mb-2">If non-veg, what did you consume?</label>
          {errors["If non-veg, what did you consume?"] && (
            <p className="text-red-500 text-sm">{errors["If non-veg, what did you consume?"]}</p>
          )}
          <select
            className="input-box"
            value={answers["If non-veg, what did you consume?"] || ""}
            onChange={(e) => handleChange("If non-veg, what did you consume?", e.target.value)}
          >
            <option value="">Select</option>
            <option>Eggs</option>
            <option>Chicken</option>
            <option>Mutton</option>
            <option>Fish</option>
            <option>Beef</option>
          </select>
        </div>
      )}

      {/* Did you order food online today? */}
      <div className="form-group mt-8">
        <label className="block font-bold mb-2">Did you order food online today?</label>
        {errors["Did you order food online today?"] && (
          <p className="text-red-500 text-sm">{errors["Did you order food online today?"]}</p>
        )}
        <div className="radio-group space-x-6">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                value={option}
                checked={answers["Did you order food online today?"] === option}
                onChange={(e) => handleChange("Did you order food online today?", e.target.value)}
                className="w-5 h-5 mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* If yes, how many meals? */}
      {orderedFood && (
        <div className="form-group mt-8">
          <label className="block font-bold mb-2">If yes, how many meals?</label>
          {errors["If yes, how many meals?"] && (
            <p className="text-red-500 text-sm">{errors["If yes, how many meals?"]}</p>
          )}
          <input
            type="number"
            className="input-box"
            placeholder="Enter number of meals"
            value={answers["If yes, how many meals?"] || ""}
            onChange={(e) => handleChange("If yes, how many meals?", parseInt(e.target.value) || "")}
          />
        </div>
      )}

      {/* How much food did you waste today? */}
      <div className="form-group mt-8">
        <label className="block font-bold mb-2">How much food did you waste today?</label>
        {errors["How much food did you waste today?"] && (
          <p className="text-red-500 text-sm">{errors["How much food did you waste today?"]}</p>
        )}
        <select
          className="input-box"
          value={answers["How much food did you waste today?"] || ""}
          onChange={(e) => handleChange("How much food did you waste today?", e.target.value)}
        >
          <option value="">Select</option>
          <option>None</option>
          <option>A little</option>
          <option>A lot</option>
        </select>
      </div>

      
    </div>
  );
}
