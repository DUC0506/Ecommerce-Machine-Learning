// src/VerifyAccount.js
import useValidation from "../utils/validator";
import React, { useState } from "react";

const VerifyApartment = ({ onSubmit, isOpen }) => {
  const [formData, setFormData] = useState({
    buildingName: "",
    numberFloor: "",
    numberApartment: "",
    phone: "",
    agreed: false,
  });

  const [showTerms, setShowTerms] = useState(false);
  const { validateUser } = useValidation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      agreed: e.target.checked,
    });
  };
  const handleSubmit = () => {
    validateUser(formData);
    // Validate and submit the form data
    if (formData.agreed) {
      onSubmit(formData);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      handleSubmit();
    }
  };
  return (
    <div
      className={`h-full ${
        isOpen ? "flex" : "hidden"
      }  flex-col justify-center items-center bg-gray-100 rounded-xl `}
    >
      <div className="w-full max-w-lg p-12 bg-white rounded-xl shadow-md font-sans ">
        <h2 className="text-2xl font-bold mb-6 text-center font-sans ">
          Verifying information
        </h2>
        <form>
          {/* Other input fields */}
          <div className="mb-4">
            <label className="block text-gray-700 font-sans">
              Building name
            </label>
            <input
              type="text"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="w-full px-6 py-2 border rounded-3xl mt-2 focus:outline-yellow-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-sans">
              Number of floors
            </label>
            <input
              type="text"
              name="numberFloor"
              value={formData.numberFloor}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="w-full px-6 py-2 border rounded-3xl mt-2 focus:outline-yellow-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-sans">
              Number of apartment
            </label>
            <input
              type="text"
              name="numberApartment"
              value={formData.numberApartment}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="w-full px-6 py-2 border rounded-3xl mt-2 focus:outline-yellow-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-sans">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="w-full px-6 py-2 border rounded-3xl mt-2 focus:outline-yellow-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.agreed}
                onChange={handleCheckboxChange}
                onKeyDown={handleKeyPress}
                className="form-checkbox"
                required
              />
              <span className="ml-2 font-sans">
                I agree{" "}
                <button
                  type="button"
                  className="text-blue-500 underline font-sans"
                  onClick={() => setShowTerms(true)}
                >
                  to the requirements and terms
                </button>
              </span>
            </label>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-yellow-500 hover:bg-yellow-600 font-semibold text-white py-2 px-4 rounded font-sans"
          >
            Register
          </button>
        </form>
      </div>

      {showTerms && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
            <h3 className="text-lg font-bold mb-4 font-sans  ">
              Terms and condition
            </h3>
            <div className="overflow-y-auto max-h-64">
              {/* Terms content */}
              <p className="font-sans">
                1. Purpose
                <br />
                This platform was created to provide an environment safe and
                reliable for residents of the apartment complex to buy, sell and
                exchange goods and services.
              </p>
              <p className="font-sans">
                2.Registration information
                <br />
                You commit to provide accurate and complete information when
                registering for an account, including but not limited to full
                name, email address, phone number, and residential address in
                the apartment.
              </p>
              <p className="font-sans">
                3.Information security
                <br />
                We are committed to protecting your personal information and
                only use it for verification and account management purposes on
                the platform.
              </p>
              <p className="font-sans">
                4. Account Usage
                <br />
                Your account is for your sole use and may not be shared or
                transfer to another person.
              </p>
              <p className="font-sans">
                5. Rights and Responsibilities
                <br />
                You have the right to use the platform to buy, sell and exchange
                goods, services with other residents in the apartment complex.
              </p>
              <p className="font-sans">
                6.Prohibited Acts
                <br />
                Use the platform to conduct fraudulent or illegal activities
                illegal or harmful to other residents.
              </p>
              <p className="font-sans">
                7.Refund Policy and Dispute Resolution
                <br />
                Transactions between residents are voluntary agreements and are
                borne by you Responsibility for resolving disputes, if any.
              </p>
              <p className="font-sans">
                8.Termination of Service
                <br />
                We reserve the right to terminate or restrict your account if
                you violate the terms of use or otherwise engage in harmful
                conduct foundation or other residents.
              </p>
              <p className="font-sans">
                9. Changes to Terms
                <br />
                We may change these terms of use from time to time time and will
                notify you of such changes.
              </p>
              <p className="font-sans">
                10. Contact
                <br />
                If you have any questions or need support, please get in touch
                us via [contact address or support email].
              </p>
            </div>
            <button
              onClick={() => setShowTerms(false)}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-sans "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default VerifyApartment;
