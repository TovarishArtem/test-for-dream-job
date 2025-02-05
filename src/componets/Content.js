import React, { Component, createRef } from "react";
import gsap from "gsap";

export class Content extends Component {
  constructor(props) {
    super(props);
    this.contentRef = createRef(); // Создаем ref
  }

  componentDidMount() {
    gsap.fromTo(
      this.contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
    
  }

  render() {
    return (
      <div  className="content_main">
        <div  ref={this.contentRef} >
          <div className="content_title">{this.props.seminar.title}</div>
          <div className="content_description">{this.props.seminar.description}</div>
          <div className="content_date"><strong>Дата:</strong> {this.props.seminar.date}</div>
          <div className="content_time"><strong>Время:</strong> {this.props.seminar.time}</div>
          <img className="photo_seminar" src={this.props.seminar.photo} alt="Seminar" />
        </div>
      </div>
    );
  }
}

export default Content;
