import './App.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay"
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, Fragment, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import LogRegi from './components/loginRegi';
import axios from "axios";


const locales = {
  "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})



function App(){
  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
  const [allEvents, setAllEvents] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("")
  useEffect(() => {
    if (userId) {
      axios.get(`/api/events/${userId}`).then(res => {
      console.log(res.data)
      setAllEvents(res.data.map(event => {
        return {
          ...event,
          start: new Date(event.start_date),
          end: new Date(event.end_date)
        }
      }))
    })
  }
  }, [userId])

  function handleLogoutEvent() {
    setUserId('')
    setIsLoggedIn('')
  }
  function handleAddEvent() {
    axios.post("/api/events",{...newEvent, userId}).then(res => {
      console.log(res.data)
      setAllEvents(res.data.map(event => {
        return {
          ...event,
          start: new Date(event.start_date),
          end: new Date(event.end_date)
        }
      }))
    })
  }

  return !isLoggedIn? <LogRegi setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />:(
    <div className="App">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input type="text" placeholder='Add Title' style={{width: "20%", marginRight: "10px"}} 
          value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value}) }
        />
        <DatePicker placeholderText='Start Date' style={{marginRight: "10px"}}
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start: start})} />
        <DatePicker placeholderText='End Date'
        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end: end})} />
        <button style={{marginTop: "10px"}} onClick={handleAddEvent}>
          Add Event
        </button>
        <button style={{marginTop: "10px"}} onClick={handleLogoutEvent}>
          Log Out
        </button>
      </div>

      <Calendar 
        localizer={localizer} 
        events={allEvents}
        startAccessor="start" 
        endAccessor="end" 
        style={{height: 500, margin: "50px"}} 
        />
    </div>
  );
}

export default App;