import React from "react";
import gsap from "gsap";
import Parallax from "parallax-js";
import bgImg from "../../images/background.png";
import rock1Img from "../../images/rock.png";
import earthImg from "../../images/earth.png";
import midImg from "../../images/mid.png";
import foregroundImg from "../../images/foreground.png";
import { useRef } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";

const Landing = ({ authenticated }) => {
  let sectionRef = useRef();

  let tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  useEffect(() => {
    const parallaxInstance = new Parallax(sectionRef);
    tl.to(".text", { y: "0%", duration: 1, stagger: 0.35, delay: 0.5 });
    tl.to("#slider", { y: "-100%", duration: 1, delay: 0.5 });
    tl.to("#intro", { y: "-100%", duration: 1 }, "-=1");
  }, []);

  return (
    <>
      <div id="intro">
        <div className="intro-text">
          <h1 className="hide">
            <span className="text">Create.</span>
          </h1>
          <h1 className="hide">
            <span className="text">Track.</span>
          </h1>
          <h1 className="hide">
            <span className="text">Succeed.</span>
          </h1>
        </div>
      </div>
      <div id="slider"></div>
      <div id="landing">
        <nav>
          <div className="my-logo text-primary-100">
            <a href="/">Pt.</a>
          </div>
          {authenticated ? (
            <div className="my-nav-links">
              <ul>
                <a href="/projects">Projects</a>
              </ul>
            </div>
          ) : (
            <div className="my-nav-links">
              <ul>
                <a href="/signin">Sign In</a>
              </ul>
            </div>
          )}
        </nav>
        <section id="sectionone" className="screen">
          <div id="scene" ref={(ele) => (sectionRef = ele)}>
            <div data-depth="0.1" className="bg">
              <img src={bgImg} alt="" />
            </div>
            <div data-depth="0.2" className="rock1">
              <img src={rock1Img} alt="" />
            </div>
            <div data-depth="1.2" className="earth">
              <img src={earthImg} alt="" />
            </div>
            <div data-depth="0.1" className="text">
              <h1>Project Tracker</h1>
            </div>
            <div data-depth="0.4" className="mid">
              <img src={midImg} alt="" />
            </div>
            <div data-depth="0.1" className="fore">
              <img src={foregroundImg} alt="" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStatesToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStatesToProps, {})(Landing);
