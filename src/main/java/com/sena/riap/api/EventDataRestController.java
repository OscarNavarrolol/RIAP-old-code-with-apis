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
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
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
            // Devuelve una lista vacia en caso de error.
            return Collections.emptyList();
        }
    }

    @PostMapping("/create_event")
    public EventData createNewEvent(@RequestBody EventData eventData, @RequestParam Integer courseNumber) {
        // Guarda evento en la BD
        EventData savedEventData = eventDataService.saveEventData(eventData);

        // La lista de aprendices asociados al curso
        List<UserData> learners = userDataService.getLearnersByCourseNumber(courseNumber);

        // Crea registros de asistencia vacios para cada aprendiz asociado al curso
        for (UserData learner : learners) {
            Attendance attendance = new Attendance();
            attendance.setIdEvent(savedEventData.getIdEvent());
            attendance.setIdUser(learner.getIdUser());
            // No establecer la hora de asistencia por ahora
            attendanceService.saveAttendance(attendance);
        }

        return savedEventData;
    }

    @DeleteMapping("/delete_event/{eventId}")
    public void deleteEvent(@PathVariable Long eventId) {
        // borra todas las asistencias relacionadas a el evento y luego el evento
        if (eventId != null) {
            try {
                attendanceService.deleteAllByEventId(eventId);
                eventDataService.deleteEventData(eventId);
            } catch (Exception e) {
                System.out.println("Error en el método deleteEvent: " + e);
            }
        } else {
            System.out.println("ID de evento no encontrado");
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
