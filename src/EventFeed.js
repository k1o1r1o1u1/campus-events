import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./EventFeed.css";

export default function EventFeed() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snap = await getDocs(collection(db, "events"));
        let data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Convert date fields to Date objects
        data = data.map(ev => {
          let dateObj;
          if (ev.date && ev.date.seconds) {
            dateObj = new Date(ev.date.seconds * 1000);
          } else {
            dateObj = new Date(ev.date);
          }
          return { ...ev, _dateObj: dateObj };
        });

        // Keep only upcoming events
        const now = new Date();
        const upcoming = data.filter(ev => ev._dateObj >= now);

        // Sort by soonest first
        upcoming.sort((a, b) => a._dateObj - b._dateObj);

        setEvents(upcoming);

        // Generate categories dynamically
        const cats = ["All", ...Array.from(new Set(upcoming.map(e => e.category || "Other")))];
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter(e => (e.category || "Other") === selectedCategory);

  const formatDate = (d) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (d) => {
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="event-feed-container">
      <h2 className="page-title">Upcoming Events</h2>

      <div className="filter-row">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="event-list">
        {filteredEvents.length === 0 ? (
          <p className="no-events">No upcoming events.</p>
        ) : (
          filteredEvents.map(ev => (
            <div className="card" key={ev.id}>
              <h3>{ev.title}</h3>

              <div className="meta-row">
                <span><strong>Date:</strong> {formatDate(ev._dateObj)}</span>
                <span><strong>Time:</strong> {formatTime(ev._dateObj)}</span>
              </div>

              <p><strong>Category:</strong> {ev.category}</p>
              <p className="organizer"><strong>Organizer:</strong> {ev.organizer}</p>
              <p className="organizer"><strong>Contact No.:</strong> {ev.contactNumber}</p>

              {ev.link && (
                <div style={{ marginTop: 8 }}>
                  <a href={ev.link} target="_blank" rel="noopener noreferrer">
                    <button className="action-btn">View / Register</button>
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
