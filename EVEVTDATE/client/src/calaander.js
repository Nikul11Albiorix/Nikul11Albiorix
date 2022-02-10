import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// const events = [{ start: new Date(), end: new Date(), title: "special event" }];

const DnDCalendar = withDragAndDrop(Calendar);

const ShiwCalendar = () => {
    
    const [ event , setEvent ] = useState([])

    const onEventDrop = (data) => {
        console.log(data);
    };
    const onEventResize = (data) => {
    const { start, end } = data;

        setEvent[0].start = start
        setEvent[0].end   = end
    };
    return (
        <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="month"
            events={event}
            localizer={localizer}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            resizable
            style={{ height: "100vh" }}
        />
    )
}

export default ShiwCalendar