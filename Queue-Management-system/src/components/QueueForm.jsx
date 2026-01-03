import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

export default function QueueForm({ onAdd }) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !service.trim()) return;

    onAdd({ name, service });
    setName("");
    setService("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add to Queue
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Service Selection */}
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Service</option>
          <option value="consultation">Consultation</option>
          <option value="payment">Payment</option>
          <option value="support">Support</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          <FaUserPlus />
          Add Customer
        </button>
      </form>
    </div>
  );
}
