import React, { Component } from 'react'
import { FaMinus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

export class Seminar extends Component {
  render() {
    return (
      <div className='seminar' onClick={() => this.props.onClick(this.props.seminar)}>
      
        <div className='container_seminar'>
          {this.props.seminar.title}
          <div className='container_buttons_seminar'>
            <MdModeEdit  onClick= { () => this.props.onEdit(this.props.seminar)} className='button' />
            <FaMinus className='button' onClick= { () => this.props.delete(this.props.seminar.id)} />
          </div> 
          
        </div>
        
      </div>
    )
  }
}

export default Seminar