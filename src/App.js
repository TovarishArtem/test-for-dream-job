import React, { Component } from 'react';
import axios from 'axios';
import Seminar from './componets/Seminar';
import Modal from './componets/Modal';
import { FaPlus } from "react-icons/fa";
import Content from './componets/Content';
import Header from './componets/Header';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seminars: [],
      isModalOpen: false,
      selectedSeminar: null, // Семинар, который мы редактируем (или null для добавления)
      contentSide: null, // Правая чать экрана где будет контент выбранного сценария
    };
  }

  // Загрузка семинаров с сервера
  componentDidMount() {
    axios.get("http://localhost:5000/seminars")
      .then(response => this.setState({ seminars: response.data }))
      .catch(error => console.error("Ошибка загрузки семинаров:", error));
  }

  // Открытие модального окна для редактирования
  openEditModal = (seminar) => {
    this.setState({
      isModalOpen: true,
      selectedSeminar: seminar // Передаем семинар для редактирования
    });
  };

  // Открытие модального окна для добавления нового семинара
  openAddModal = () => {
    this.setState({
      isModalOpen: true,
      selectedSeminar: null // Для добавления новый семинар без данных
    });
  };

  // Закрытие модального окна
  closeEditModal = () => {
    this.setState({ isModalOpen: false, selectedSeminar: null });
  };

  // Сохранение семинара (добавление или редактирование)
  saveSeminar = (seminarData) => {
    if (seminarData.id) {
      // Если ID есть, значит редактируем
      axios.put(`http://localhost:5000/seminars/${seminarData.id}`, seminarData)
        .then(response => {
          const updatedSeminars = this.state.seminars.map(seminar =>
            seminar.id === seminarData.id ? response.data : seminar
          );
          this.setState({ seminars: updatedSeminars });
        })
        .catch(error => console.error("Ошибка обновления семинара:", error));
    } else {
      // Если ID нет, добавляем новый
      axios.post('http://localhost:5000/seminars', seminarData)
        .then(response => {
          this.setState(prevState => ({
            seminars: [...prevState.seminars, response.data]
          }));
        })
        .catch(error => console.error("Ошибка добавления семинара:", error));
    }
  };

  // Удаление семинара
  deleteSeminar = (id) => {
    axios.delete(`http://localhost:5000/seminars/${id}`)
      .then(() => {
        const updatedSeminars = this.state.seminars.filter(seminar => seminar.id !== id);
        this.setState({ seminars: updatedSeminars });
      })
      .catch(error => console.error("Ошибка удаления семинара:", error));
  };

  render() {
    return (
      <>
        <Header />
     
      <div className='main_container'>
      <main>
        <div className='container_buttons_list'>
          <h1>Список семинаров</h1>
          <FaPlus className='button'  onClick={this.openAddModal} />
        </div>
        <div className='list_seminars'>
        {this.state.seminars.map(seminar => (
          <Seminar 
            key={seminar.id} 
            seminar={seminar} 
            onEdit={this.openEditModal} 
            delete={this.deleteSeminar}
            onClick={(seminar) => {
              this.setState({ contentSide: seminar });
          }}
          />
        ))}
        </div>

        {/* Модальное окно для добавления/редактирования семинара */}
        {this.state.isModalOpen && (
          <Modal 
            seminar={this.state.selectedSeminar} 
            onSave={this.saveSeminar} 
            onClose={this.closeEditModal} 
          />
        )}
        </main>
        
        {this.state.contentSide && (
          <Content seminar={this.state.contentSide} key={this.state.contentSide.id} />
        )}
          
      </div>
      </>
    );
  }
}

export default App;
