import React from "react";
import TeamMember from "../TeamMember/TeamMember";

const teamMemberItems = [
  {
    name: "Nguyễn Trần Cao Vy",
    position: "CEO",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Nguyễn Thị Thanh Châu",
    position: "CMO",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Phạm Hồng Phúc An",
    position: "CFO",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Nguyễn Võ Anh Kiệt",
    position: "Front-end Developer",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Phan Lê Thanh Thảo",
    position: "Back-end Developer",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Lê Chí Hải",
    position: "Tech Lead",
    image: "./assets/images/about/team-8.jpg",
  },
  {
    name: "Trần Nhật Thu San",
    position: "Art Director",
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
              <h3>Thành Viên Sáng Lập Spotlight</h3>
              <p>
              ⭐Always Shining Like A Star⭐
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
