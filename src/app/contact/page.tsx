"use client";

import { useState } from "react";
import styles from "@/app/contact/contact.module.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <p>Have questions or feedback? Send us a message!</p>

      {submitted && <p className={styles.success}>Your message has been sent!</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
