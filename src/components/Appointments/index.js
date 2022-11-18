// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuIdv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const dateFormatted = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuIdv4(),
      title: titleInput,
      date: dateFormatted,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onAddDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  filterAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredClassName = isFilterActive ? 'filtered' : 'not-filtered'
    const filteredAppointmentList = this.filterAppointmentList()

    return (
      <div className="bg-container">
        <div className="appointment-card">
          <div className="header-container">
            <div className="create-appointment-container">
              <form className="form" onSubmit={this.onSubmitAppointment}>
                <h1 className="main-heading">Add Appointment</h1>
                <label htmlFor="title" className="labels">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="input-box"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onTitleInput}
                  autoComplete="OFF"
                />
                <label htmlFor="date" className="labels">
                  DATE
                </label>
                <input
                  type="date"
                  className="input-box"
                  id="date"
                  onChange={this.onAddDate}
                  value={dateInput}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="break" />
            <div className="header-starred-container">
              <h1 className="main-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${filteredClassName}`}
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-container">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                  key={eachAppointment.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
