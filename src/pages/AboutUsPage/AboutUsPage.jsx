import React from "react";
import FeatureList from "../../components/FeatureList/FeatureList";
import AchievementList from "../../components/AchievementList/AchievementList";
import TeamMemberList from "../../components/TeamMemberList/TeamMemberList";

export default function AboutUsPage() {
  return (
    <div className="wrapper">
      <div className="hero-banner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-9 col-md-10">
              <div className="hero-banner-content text-center">
                <h2 className="mb-0"></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="explore-events p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="main-title checkout-title">
                <h3>
                  Our aim is to provide a powerful and affordable event
                  ticketing solution that can handle events of any size and
                  complexity without an issue.
                </h3>
              </div>
              <div className="about--description">
                <p>
                  Barren’s online event ticketing software was built on the idea
                  that anyone, anywhere in the world wanting to organise an
                  event should have the tools to simply do so. We promote this
                  idea everyday through the dedication of a team based out of
                  Melbourne, Australia.
                </p>
                <p>
                  The focus of our efforts is the event organiser, who works
                  hard to ensure that their attendees have a great experience.
                  We share that passion for bringing people together, creating
                  memories and enriching lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="host-engaging-event-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="main-title checkout-title text-center">
                <h3>We are all about enriching communities​</h3>
              </div>
              <div className="communities-steps">
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <a
                      href="#"
                      className="main-card communities-item"
                      data-bs-toggle="modal"
                      data-bs-target="#communitieModal"
                    >
                      <div className="communities-img">
                        <img src="./assets/images/about/img-1.jpg" alt="" />
                      </div>
                      <div className="communities-content">
                        <p>
                          We work with several industry leaders and community
                          groups around Australia and want all of our event
                          organisers to succeed in everything they do. Events
                          are not always easy, but selling tickets online should
                          be.
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <a
                      href="#"
                      className="main-card communities-item"
                      data-bs-toggle="modal"
                      data-bs-target="#communitieModal"
                    >
                      <div className="communities-img">
                        <img src="./assets/images/about/img-2.jpg" alt="" />
                      </div>
                      <div className="communities-content">
                        <p>
                          We are committed to making a positive impact on the
                          community. That's why our pricing structure is set so
                          that everyone can afford to use Barren, and it's why
                          we offer our system free of charge for any free events
                          or registrations.
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <a
                      href="#"
                      className="main-card communities-item"
                      data-bs-toggle="modal"
                      data-bs-target="#communitieModal"
                    >
                      <div className="communities-img">
                        <img src="./assets/images/about/img-3.jpg" alt="" />
                      </div>
                      <div className="communities-content">
                        <p>
                          This provides an additional revenue stream for your
                          charity and allows us to positively contribute to the
                          causes that are important to you and your community.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeatureList />
      <TeamMemberList />
      <AchievementList />
    </div>
  );
}
