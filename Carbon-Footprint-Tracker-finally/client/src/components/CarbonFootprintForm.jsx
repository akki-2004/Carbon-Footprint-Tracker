import React, { useState } from "react";
import axios from "axios";
import TransportForm from "./TransportForm";
import FoodForm from "./FoodForm";
import EnergyForm from "./EnergyForm";
import WaterForm from "./WaterForm";
import WasteForm from "./WasteForm";
import SustainabilityForm from "./SustainabilityForm";
import CarbonFootprintIntro from "./CarbonFootprintIntro";
import Modal from "./Modal"; // Import the Modal

const categories = ["Transport", "Food", "Energy", "Water", "Waste", "Sustainability"];

export default function CarbonFootprintForm() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ visible: false, message: "", type: "" }); // State for modal
  const token = localStorage.getItem("token");

  if (!token) {
    return <CarbonFootprintIntro />;
  }

  const handleChange = (category, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [question]: value,
      },
    }));
  };

  const handleNext = () => setCurrentCategory((prev) => prev + 1);
  const handleBack = () => setCurrentCategory((prev) => prev - 1);
  const handleSubmit = async () => {
    const formattedAnswers = {};

    // Convert first-level keys to lowercase
    Object.keys(answers).forEach((key) => {
      formattedAnswers[key.toLowerCase()] = answers[key];
    });

    console.log("🔍 Formatted Data Before Sending:", JSON.stringify(formattedAnswers, null, 2));

    // Get the logged-in user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));  // Assuming 'user' is stored as a JSON string

    if (!user || !user.id) {
      console.error("❌ User ID not found!");
      setModal({
        visible: true,
        message: "User not logged in. Please log in and try again.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/carbon-footprint", {
        userId: user.id,  // Use the logged-in user's ID
        ...formattedAnswers,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Success:", response.data);

      // Show success modal
      setModal({
        visible: true,
        message: "Carbon footprint recorded successfully!",
        type: "success",
      });

      // Reset form data after successful submission
      setAnswers({});
      setErrors({});
      setCurrentCategory(0); // Optionally reset to the first category
    } catch (error) {
      console.error("❌ Error submitting data:", error.response ? error.response.data : error);

      // Show error modal
      setModal({
        visible: true,
        message: error.response ? error.response.data.message : "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const closeModal = () => {
    setModal({ visible: false, message: "", type: "" }); // Close modal
  };

  const renderForm = () => {
    const category = categories[currentCategory];
    const FormComponent = {
      Transport: TransportForm,
      Food: FoodForm,
      Energy: EnergyForm,
      Water: WaterForm,
      Waste: WasteForm,
      Sustainability: SustainabilityForm,
    }[category];

    return (
      <FormComponent
        answers={answers[category] || {}}
        handleChange={(question, value) => handleChange(category, question, value)}
        errors={errors[category] || {}}
      />
    );
  };

  return (
    <div style={styles.container}>
      {/* Progress Bar */}
      <div style={styles.progressBar}>
        {categories.map((cat, index) => (
          <React.Fragment key={cat}>
            <div style={{ ...styles.progressStepContainer, ...(currentCategory === index ? styles.activeStep : {}) }}>
              <div style={styles.progressStep}></div>
              <div style={styles.categoryLabel}>{cat.toUpperCase()}</div>
            </div>
            {index < categories.length - 1 && <div style={styles.progressArrow}>→</div>}
          </React.Fragment>
        ))}
      </div>

      {/* Dynamic Form Rendering */}
      <div style={styles.formContainer}>
        <h2 style={styles.categoryTitle}>{categories[currentCategory]}</h2>
        {renderForm()}
      </div>

      {/* Navigation Buttons */}
      <div style={styles.buttonContainer}>
        {currentCategory > 0 && <button style={styles.navButton} onClick={handleBack}>Back</button>}
        {currentCategory < categories.length - 1 ? (
          <button style={styles.navButton} onClick={handleNext}>Next</button>
        ) : (
          <button style={styles.navButtonSubmit} onClick={handleSubmit}>Submit</button>
        )}
      </div>

      {/* Modal */}
      {modal.visible && <Modal message={modal.message} type={modal.type} onClose={closeModal} />}
    </div>
  );
}

const styles = {
  container: {
    padding: "4.5rem",
    width: "100%",
    maxWidth: "900px",
    margin: "auto",
    textAlign: "center",
  },
  progressBar: {
    marginTop:"6.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressStepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "10px",
  },
  progressStep: {
    width: "20px",
    height: "20px",
    backgroundColor: "#ddd",
    borderRadius: "50%",
    marginBottom: "5px",
  },
  activeStep: {
    backgroundColor: "#4CAF50", // Green for active step
  },
  categoryLabel: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  progressArrow: {
    fontSize: "20px",
    color: "#000",
  },
  formContainer: {
    marginTop: "1.5rem",
  },
  categoryTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  buttonContainer: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
  },
  navButton: {
    padding: "0.5rem 1.5rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  navButtonSubmit: {
    padding: "0.5rem 1.5rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
