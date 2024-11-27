import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import RestaurantService from "../services/restaurant.service";

const RestaurantComponent = ({ currentUser, setCurrentUser }) => {
  const { id } = useParams();
  const { theName } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [showCommentArea, setShowCommentArea] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (location.pathname.includes("/findByName")) {
          data = await RestaurantService.getRestaurantByName(theName);
        } else {
          data = await RestaurantService.getRestaurantById(id);
        }
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, theName, location.pathname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCommentSubmit = async () => {
    console.log("handleCmmentSubmit call");
    try {
      console.log(id, " # ", content, " # ", currentUser.user._id);
      const response = await RestaurantService.postComment(
        id,
        content,
        currentUser.user._id
      );
      console.log("Comment added:", response);
      setContent(""); // Clear the input after submission
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="container py-4 ms-5">
      {/*  Section 1: Restaurant Picture  */}
      <div className="mb-4 d-flex ">
        <div
          id="restaurantCarousel"
          className="carousel slide mb-4 w-50 me-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {restaurant.image_url.map((url, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={url}
                  alt={`${restaurant.name} ${index + 1}`}
                  className="img-fluid rounded w-100"
                  style={{
                    height: "550px",
                    objectFit: "cover",
                    width: "100%", // Ensures consistent width
                  }}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#restaurantCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#restaurantCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/*  Section 2: Description */}
        <div className="mb-4 w-50 ms-2" style={{ fontFamily: "Inter" }}>
          <h2 style={{ weight: "bold", fontSize: "100px" }}>
            {restaurant.name}
          </h2>
          <p
            className="w-25 fs-6"
            style={{
              color: "#c02434",
              borderRadius: "4px",
            }}
          >
            {restaurant.michelin_type}
          </p>
          <p className="text-secondary fs-6">{restaurant.address}</p>
          <h4 className="fs-3 mt-5">Description</h4>
          <p className="fs-5">{restaurant.description}</p>
          {/* Conditional rendering for buttons */}
          {currentUser ? (
            currentUser.user.role === "customer" ? (
              <>
                <button
                  className="btn btn-dark"
                  onClick={() => setShowCommentArea(!showCommentArea)} // Toggle comment area
                >
                  {showCommentArea ? "Cancel" : "Make a Comment"}
                </button>
                {showCommentArea && (
                  <div className="mt-3">
                    <textarea
                      className="form-control"
                      rows="3"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your comment here..."
                    ></textarea>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleCommentSubmit}
                    >
                      Submit Comment
                    </button>
                  </div>
                )}
              </>
            ) : currentUser.user.role === "restaurateur" ? (
              <button
                className="btn btn-dark"
                onClick={() => console.log("Edit restaurant")}
              >
                Edit Restaurant
              </button>
            ) : null
          ) : (
            <p>Please log in to interact with the restaurant.</p>
          )}
        </div>
      </div>

      {/* Section 3: Comments */}
      <div>
        <h4>Comments</h4>
        <ul className="list-group">
          {restaurant.comments && restaurant.comments.length > 0 ? (
            restaurant.comments.map((comment, index) => (
              <li key={index} className="list-group-item">
                <p>
                  <strong>{comment.user}:</strong> {comment.text}
                </p>
              </li>
            ))
          ) : (
            <p>No comments yet. Be the first to leave one!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantComponent;
