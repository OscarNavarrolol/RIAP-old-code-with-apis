package com.sena.riap.api;

import com.sena.riap.entities.Attendance;
import com.sena.riap.entities.EventData;
import com.sena.riap.entities.UserData;
import com.sena.riap.service.AttendanceService;
import com.sena.riap.service.CourseService;
import com.sena.riap.service.EventDataService;
import com.sena.riap.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api_event_data")
public class EventDataRestController {

    @Autowired
    private EventDataService eventDataService;

    @Autowired
    private UserDataService userDataService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private CourseService courseService;

    @GetMapping("/list_event_data")
    public List<EventData> listEventData() {
        return eventDataService.getEventData();
    }

    @GetMapping("/find/{id_event}")
    public EventData getEventData(@PathVariable("id_event") Long idEvent) {
        return eventDataService.getEventDataById(idEvent);
    }

    @PostMapping("/save")
    public EventData saveEventData(@RequestBody EventData eventData) {
        return eventDataService.saveEventData(eventData);
    }

    @PutMapping("/update/{id_event}")
    public EventData updateEventData(@PathVariable("id_event") Long idEvent, @RequestBody EventData eventData) {
        return eventDataService.updateEventData(idEvent, eventData);
    }

    @DeleteMapping("/delete/{id_event}")
    public void deleteEventData(@PathVariable("id_event") Long idEvent) {
        eventDataService.deleteEventData(idEvent);
    }

    // METHODS REQUIRED FOR THE PROJECT

    @GetMapping("/list_event")
    public List<EventData> listEvents(@RequestParam(required = false) Integer courseNumber) {
        if (courseNumber != null) {
            return eventDataService.findEventsByCourseNumber(courseNumber);
        } else {
            // Returns an empty collection on error.
            return Collections.emptyList();
        }
    }

    @PostMapping("/create_event")
    public EventData createNewEvent(@RequestBody EventData eventData, @RequestParam Integer courseNumber) {

        if (eventData == null) {
            throw new IllegalArgumentException("EventData cannot be null");
        }
        if (courseNumber == null) {
            throw new IllegalArgumentException("course number must not be null");
        }

        EventData savedEventData = eventDataService.saveEventData(eventData);
        List<UserData> learners = userDataService.getLearnersByCourseNumber(courseNumber);

        // Create empty attendance records for each learner associated with the course
        for (UserData learner : learners) {
            Attendance attendance = new Attendance();
            attendance.setIdEvent(savedEventData.getIdEvent());
            attendance.setIdUser(learner.getIdUser());
            // Not setting attendance time
            attendanceService.saveAttendance(attendance);
        }

        return savedEventData;
    }

    @DeleteMapping("/delete_event/{eventId}")
    public void deleteEvent(@PathVariable Long eventId) {
        // delete all attendances related to the event and then the event
        if (eventId != null) {
            try {
                attendanceService.deleteAllByEventId(eventId);
                eventDataService.deleteEventData(eventId);
            } catch (Exception e) {
                System.out.println("Error in deleteEvent method: " + e);
            }
        } else {
            System.out.println("Event ID not found");
        }
    }


    @GetMapping("/update_event/{eventId}")
    public EventData getEventDataForUpdate(@PathVariable Long eventId) {
        return eventDataService.getEventDataById(eventId);
    }

    @PutMapping("/update_event/{eventId}")
    public EventData updateEvent(@PathVariable Long eventId, @RequestBody EventData updatedEventData) {
        return eventDataService.updateEventData(eventId, updatedEventData);
    }



    @GetMapping("/course_numbers")
    public List<Integer> allCourseNumbers() {
        UserData user = userDataService.getLoggedInUser();
        Long idUser = user.getIdUser();
        return courseService.getCoursesByUser(idUser);
    }

}
