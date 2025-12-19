import "./../Styles/Requestbook.css";
import { useForm } from "react-hook-form";
import { useState } from "react";


const Requestbook = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmithandler = async (fdata) => {
    try {
      setLoading(true);
      setMessage("");

      const requestData = {
        title: fdata.title,
        author: fdata.author,
        genre: fdata.genre,
        publicationYear: parseInt(fdata.publicationYear),
        requestType: "book"
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Book request added successfully!");
        alert("Book request added successfully!");
        reset();
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to add book request");
        alert("Failed to add book request: " + (error.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error adding book request");
      alert("Error adding book request: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  

    return (
        <div className="forms">
            <h1>Add Request Book</h1>
            <br></br>
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit(onSubmithandler)}>
                <label>Book Title:</label>
                <input {...register("title", { required: "Title is required" })} type="text"></input>
                

                <label>Author Name:</label>
                <input {...register("author")} type="text"></input>

                <label>Publication Year:</label>
                <input {...register("publicationYear", { pattern: /^\d+$/ })} type="number"></input>

                <label>Genre:</label>
                <input {...register("genre")} type="text"></input>

                <button className="submitButton" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Request book"}
                </button>
            
            </form>
        </div>
    );
};

export default Requestbook;
