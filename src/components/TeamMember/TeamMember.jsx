import React from "react";

export default function TeamMember({ name, position, image }) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
      <div className="main-card team-card">
        <div className="team-img">
          <img src={image} alt="" />
        </div>
        <div className="team-content">
          <h4>{name}</h4>
          <span>{position}</span>
          <div className="user-social-links-group">
            <a
              href="https://www.facebook.com/"
              className="user-social-link"
              target="_blank"
            >
              <i className="fab fa-facebook-square" />
            </a>
            <a
              href="https://www.instagram.com/accounts/login/"
              className="user-social-link"
              target="_blank"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://twitter.com/"
              className="user-social-link"
              target="_blank"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              href="https://www.linkedin.com/"
              className="user-social-link"
              target="_blank"
            >
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
