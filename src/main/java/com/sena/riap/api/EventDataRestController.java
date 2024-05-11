package com.sena.riap.api;

import com.sena.riap.entities.Attendance;
import com.sena.riap.entities.EventData;
import com.sena.riap.entities.UserData;
import com.sena.riap.service.AttendanceService;
import com.sena.riap.service.CourseService;
import com.sena.riap.service.EventDataService;
import com.sena.riap.service.UserDataService;
import com.sena.riap.service.mailservice.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private IEmailService emailService;

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
        return eventDataService.createEvent(eventData, courseNumber);
    }

    @DeleteMapping("/delete_event/{eventId}")
    public void deleteEvent(@PathVariable Long eventId, @RequestParam Integer courseNumber) {
        eventDataService.deleteEvent(eventId, courseNumber);
    }


    @GetMapping("/update_event/{eventId}")
    public EventData getEventDataForUpdate(@PathVariable Long eventId) {
        return eventDataService.getEventDataForUpdate(eventId);
    }

    @PutMapping("/update_event/{eventId}")
    public EventData updateEvent(@PathVariable Long eventId, @RequestBody EventData updatedEventData, @RequestParam Integer courseNumber) {
        return eventDataService.updateEvent(eventId, updatedEventData, courseNumber);
    }

    // toma los cursos por el usuario que se encuentre logeado
    @GetMapping("/course_numbers")
    public List<Integer> allCourseNumbers() {
        return eventDataService.getAllCourseNumbers();
    }
}
