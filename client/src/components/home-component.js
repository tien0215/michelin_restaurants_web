import React from "react";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <header className="mb-4">
          <div className="home-grid mt-5">
            {/* First Row*/}
            <h1
              className="fw-bold mb-0"
              style={{ fontFamily: "Inter", fontSize: "350px" }}
            >
              Taste
            </h1>

            {/* Second Row: with images */}
            <div className="d-flex align-items-center mt-3">
              {/* text */}
              <h1
                className="fw-bold mb-0 me-3"
                style={{ fontFamily: "Inter", fontSize: "350px" }}
              >
                the
              </h1>
              {/* Images */}
              <div
                className="d-flex "
                style={{ paddingLeft: "50px", paddingTop: "100px" }}
              >
                <img
                  src="/images/star.png" // Use "/images/logo.png" if in `public`
                  alt="Star"
                  className="me-2"
                  style={{ height: "100px", width: "100px" }}
                />
                <img
                  src="/images/star.png" // Use "/images/logo.png" if in `public`
                  alt="Star"
                  className="me-2"
                  style={{ height: "100px", width: "100px" }}
                />
                <img
                  src="/images/star.png" // Use "/images/logo.png" if in `public`
                  alt="Star"
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
            </div>

            {/* Third Row */}
            <h1
              className="fw-bold mb-0 mt-3 mb-5"
              style={{ fontFamily: "Inter", fontSize: "350px" }}
            >
              Stars
            </h1>

            {/*<p
              className="fs-5 mt-4"
              style={{ fontFamily: "Inter", fontSize: "24px" }}
            >
              Share your experiences at Michelin-recommended restaurants—a space
              for you to connect with fellow Michelin foodies and record your
              journey of tasting the ‘Stars’.
            </p> */}
          </div>
        </header>

        <section>
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://via.placeholder.com/1920x1080"
                  className="d-block w-100"
                  alt="Slide 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://via.placeholder.com/1920x1080"
                  className="d-block w-100"
                  alt="Slide 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://via.placeholder.com/1920x1080"
                  className="d-block w-100"
                  alt="Slide 3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://via.placeholder.com/1920x1080"
                  className="d-block w-100"
                  alt="Slide 4"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://via.placeholder.com/1920x1080"
                  className="d-block w-100"
                  alt="Slide 5"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
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
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeComponent;
