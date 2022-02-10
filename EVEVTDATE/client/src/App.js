import React, { useState } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer , momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
// const localizer = momentLocalizer(moment)


const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 6, 0),
        end: new Date(2022, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2022, 2, 7),
        end: new Date(2022, 2, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
    },
];

function App() {
    let id = 1;
    const [allEvents, setAllEvents] = useState([]);
    
    const [newEvent, setNewEvent] = useState({ title: "Add New Event", start: "", end: "" , id : id});
    
    const [ selectDate , setSelectedDate ] = useState(false)
    const [ selectEvent , setSelectedEvent ] = useState(false)
    const [ eventId , setEventId ] = useState()

    function handleAddEvent() {
      if(allEvents.length) {
        id = allEvents.length + 1
      } else {
        id = 1
      }
      newEvent.id = id
        setAllEvents([...allEvents, newEvent]);
        setSelectedDate(false)
      setNewEvent({title: "Add New Event", start: "", end: "" , id : 0})
    }
    const handleEditEvent = () => {
      console.log(newEvent);
      console.log(allEvents[eventId - 1]);
      allEvents[eventId - 1].title = newEvent.title
      allEvents[eventId - 1].start = newEvent.start
      allEvents[eventId - 1].end = newEvent.end
      setNewEvent({title: "Add New Event", start: "", end: "" , id : 0})
      setSelectedEvent(false)
    }
    const handleDeleteEvent = () => {
      allEvents.splice(eventId - 1 , 1)
      setSelectedEvent(false)
    }

    return (
      <>
        {selectDate && 
            <>
          <h2>Add New Event</h2>
          <div>
              <input type="text" placeholder="Add Title"  style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              <DatePicker placeholderText="Start Date"    style={{ marginRight: "10px" }}  selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
              <DatePicker placeholderText="End Date"      style={{ marginRight: "10px" }}  selected={newEvent.end}   onChange={(end) => {console.log("aasdasdasd"); setNewEvent({ ...newEvent, end })}} />
              <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                  Add Event
              </button>
              <button stlye={{ marginTop: "10px" }} onClick={() => setSelectedDate(false)}>
                  Cancle Event
              </button>
          </div>
          </>
        
        }
        {selectEvent && 
            <>
          <h2>Edit Event</h2>
          <div>
              <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }}  selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
              <DatePicker placeholderText="End Date"   style={{ marginRight: "10px" }}  selected={newEvent.end}   onChange={(end) => {console.log("aasdasdasd"); setNewEvent({ ...newEvent, end })}} />
              <button stlye={{ marginTop: "10px" }} onClick={handleEditEvent}>
                  Edit Event
              </button>
              <button stlye={{ marginTop: "10px" }} onClick={handleDeleteEvent}>
                  Remove Event
              </button>
              <button stlye={{ marginTop: "10px" }} onClick={() => setSelectedEvent(false)}>
                  Cancle 
              </button>
          </div>
          </>
        
        }
        <div className="App">
            <h1>Calendar</h1>
              <Calendar 
                  localizer={localizer}
                  selectable={true}
                  resizable
                  events={allEvents}
                  startAccessor="start"
                  endAccessor="end"
                  onSelectSlot={(slot) => {
                    newEvent.start = slot.start
                    newEvent.end = slot.end
                    console.log(slot.end);
                    setSelectedDate(() => {
                      if(selectEvent) {
                        return false
                      } else {
                        return true
                      }
                    })
                  }}
                  onSelectEvent={event => {
                    console.log(event);
                    newEvent.start = event.start
                    newEvent.end = event.end
                    setEventId(event.id)
                    setSelectedEvent(true)
                  }}
                  style={{  height: "100vh"}}
              />
        </div>
        </>
    );
}

export default App;
//  import React, { useState } from "react";
//  import Calendar from "react-calendar";
//  import "react-calendar/dist/Calendar.css";
// //  import ReactDOM from "react-dom";
 
// //  import "./styles.css";
 
//  function App() {
//    // Array to store month string values
//    const allMonthValues = [
//      "January",
//      "February",
//      "March",
//      "April",
//      "May",
//      "June",
//      "July",
//      "August",
//      "September",
//      "October",
//      "November",
//      "December"
//    ];
 
//    // State for date selected by user
//    const [selectedDate, setSelectedDate] = useState();
 
//    // State for text above calander
//    const [calendarText, setCalendarText] = useState(`No Date is selected`);
 
//    // Function to update selected date and calander text
//    const handleDateChange = (value) => {
//      setSelectedDate(value);
//      setCalendarText(`The selected Date is ${value.toDateString()}`);
//    };
 
//    // Function to handle selected Year change
//    const handleYearChange = (value) => {
//      const yearValue = value.getFullYear();
//      setCalendarText(`${yearValue} Year  is selected`);
//    };
 
//    // Function to handle selected Month change
//    const handleMonthChange = (value) => {
//      const monthValue = allMonthValues[value.getMonth()];
//      setCalendarText(`${monthValue} Month  is selected`);
//    };
 
//    return (
//      <div className="app">
//        <h2 className="calander-details">{calendarText}</h2>
//        <Calendar
//          onClickMonth={handleMonthChange}
//          onClickYear={handleYearChange}
//          onChange={handleDateChange}
//          value={selectedDate}
//        />
//      </div>
//    );
//  }
