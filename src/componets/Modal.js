import React, { Component } from 'react';

export class Modal extends Component {
  constructor(props) {
    super(props);
    // Инициализация состояния с текущими данными семинара
    this.state = {
      title: this.props.seminar ? this.props.seminar.title : '',
      description: this.props.seminar ? this.props.seminar.description : '',
      date: this.props.seminar ? this.props.seminar.date : '',
      time: this.props.seminar ? this.props.seminar.time : '',
      photo: this.props.seminar ? this.props.seminar.photo : ''

    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    const { title, description, date, time, photo} = this.state;
    if (title.trim() === "") return alert("Заголовок обязателен");

    const seminarData = { title, description, date, time, photo };
    
    // Если семинар уже есть то обновляем его
    if (this.props.seminar) {
      this.props.onSave({ ...seminarData, id: this.props.seminar.id });  // Передаем ID чтобы редактировать семинар
    } else {
      // Если семинар новый то добавляем его
      this.props.onSave(seminarData);
    }
    this.props.onClose();  // Закрытие модального окна
  };

  render() {
    const { seminar } = this.props;

    return (
      <div className="modal_window">
        <div className="modal">
          <h2>{seminar ? "Редактировать семинар" : "Добавить новый семинар"}</h2>
          
          <label>Название:</label>
          <input 
            type="text" 
            name="title" 
            value={this.state.title} 
            onChange={this.handleInputChange} 
          />
          
          <label>Описание:</label>
          <textarea 
            name="description" 
            value={this.state.description} 
            onChange={this.handleInputChange} 
          />
          <label>Дата:</label>
          <input 
            type="date" 
            name="date" 
            value={this.state.date} 
            onChange={this.handleInputChange} 
          />

          <label>Время:</label>
          <input 
            type="time" 
            name="time"
            value={this.state.time} 
            onChange={this.handleInputChange} 
          />

          <label>URL фотографии:</label>
          <input 
            type="text" 
            name="photo" 
            value={this.state.photo} 
            onChange={this.handleInputChange} 
          />

          
          <button onClick={this.handleSave}>
            {seminar ? "Сохранить изменения" : "Добавить"}
          </button>
          <button onClick={this.props.onClose}>Закрыть</button>
        </div>
      </div>
    );
  }
}

export default Modal;
