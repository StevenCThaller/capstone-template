import React, { useState , useRef} from "react";
import "./ContactPage.css";

function ContactForm() {
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your server or email service here
    formRef.current.reset();
    console.log(formData);
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:  </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="email">Email:   </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />
       
        <label htmlFor="message">Message:   </label>
        <br />
        <textarea
          id="message"
          name="message"
          rows="5"
          cols="40"
          value={message}
          onChange={handleMessageChange}
          required
        ></textarea>
        <br />
        <br />

        <a
          href={`mailto:your-email@example.com?subject=Contact Us&body=${encodeURIComponent(
            message
          )}`}
        >
        </a>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
