import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./SubmitEvent.css"; // matches your CSS file name

export default function SumitEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Tech");
  const [link, setLink] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "events"), {
        title,
        date,
        category,
        link,
        organizer,
        contactNumber,
        createdAt: serverTimestamp(),
      });

      alert("Event submitted successfully!");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting event");
    }
  };

  return (
    <div className="form-container">
      <h2>Submit a New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Date & Time</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
          <option value="Cultural">Cultural</option>
          <option value="Workshop">Workshop</option>
        </select>

        <label>Event Link</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <label>Organizer Name</label>
        <input
          type="text"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          required
        />

        <label>Contact Number</label>
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />

        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
}
