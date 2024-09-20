import React from "react";
import TeamMember from "../TeamMember/TeamMember";

const teamMemberItems = [
  {
    name: "Lizzy Wizzy",
    position: "Tech Lead",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Lizzy Wizzy",
    position: "Tech Lead",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Lizzy Wizzy",
    position: "Tech Lead",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Lizzy Wizzy",
    position: "Tech Lead",
    image: "./assets/images/about/team-8.jpg",
  },
];

export default function TeamMemberList() {
  return (
    <div className="host-engaging-event-block p-80">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title text-center">
              <h3>The Team Behind Barren</h3>
              <p>
                Every day we are passionately dedicated to make buying and
                selling tickets simple and secure.
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="our-team custom-border-top">
              <div className="row justify-content-xl-center">
                {teamMemberItems.map((item) => (
                  <TeamMember
                    name={item.name}
                    position={item.position}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
