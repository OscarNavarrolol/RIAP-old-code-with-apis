package com.sena.riap.service.impl;

import com.sena.riap.entities.Attendance;
import com.sena.riap.entities.EventData;
import com.sena.riap.entities.UserData;
import com.sena.riap.repository.AttendanceRepository;
import com.sena.riap.repository.CourseRepository;
import com.sena.riap.repository.EventDataRepository;
import com.sena.riap.repository.UserDataRepository;
import com.sena.riap.service.EventDataService;
import com.sena.riap.service.UserDataService;
import com.sena.riap.service.mailservice.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.util.List;
@Service
public class EventDataServiceImpl implements EventDataService {

    @Autowired
    private EventDataRepository eventDataRepository;

    @Autowired
    private UserDataRepository userDataRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private IEmailService emailService;

    @Autowired
    private UserDataService userDataService;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<EventData> getEventData() {
        return eventDataRepository.findAll();
    }

    @Override
    public EventData saveEventData(EventData eventData) {
        return eventDataRepository.save(eventData);
    }

    @Override
    public EventData getEventDataById(Long id) {
        return eventDataRepository.findById(id).orElse(null);
    }

    @Override
    public EventData updateEventData(Long id, EventData eventData) {
        EventData oldEventData = eventDataRepository.findById(id).orElse(null);
        if (oldEventData != null){
            oldEventData.setDate(eventData.getDate());
            oldEventData.setObjective(eventData.getObjective());
            oldEventData.setStartTime(eventData.getStartTime());
            oldEventData.setEndTime(eventData.getEndTime());
            oldEventData.setLocation(eventData.getLocation());
            return eventDataRepository.save(oldEventData);
        }
        return null;
    }

    @Override
    public void deleteEventData(Long id) {
        eventDataRepository.deleteById(id);
    }

    // complete methods
    @Override
    public List<EventData> findEventsByCourseNumber(int courseNumber) {
        return eventDataRepository.findEventsByCourseNumber(courseNumber);
    }

    @Override
    public EventData createEvent(EventData eventData, Integer courseNumber) {
        EventData savedEventData = saveEventData(eventData);
        List<UserData> learners = userDataRepository.findLearnersByCourseNumber(courseNumber);
        createAttendanceRecords(savedEventData, learners);
        sendEventNotification(eventData, learners);
        return savedEventData;
    }

    private void createAttendanceRecords(EventData eventData, List<UserData> learners) {
        for (UserData learner : learners) {
            Attendance attendance = new Attendance();
            attendance.setIdEvent(eventData.getIdEvent());
            attendance.setIdUser(learner.getIdUser());
            // No setting attendance time
            attendanceRepository.save(attendance);
        }
    }

    private void sendEventNotification(EventData eventData, List<UserData> learners) {
        List<String> learnerEmails = learners.stream()
                .map(UserData::getEmail)
                .collect(Collectors.toList());

        String subject = "Nuevo evento: " + eventData.getObjective();
        StringBuilder messageBuilder = new StringBuilder();
        messageBuilder.append("¡Un nuevo evento ha sido creado! Aquí están los detalles:\n")
                .append("Fecha: ").append(eventData.getDate()).append("\n")
                .append("Ubicación: ").append(eventData.getLocation()).append("\n")
                .append("Hora de inicio: ").append(eventData.getStartTime()).append("\n")
                .append("Hora de finalización: ").append(eventData.getEndTime());

        emailService.sendEmail(learnerEmails.toArray(new String[0]), subject, messageBuilder.toString());
    }

    @Override
    public void deleteEvent(Long eventId, Integer courseNumber) {
        EventData eventData = getEventDataById(eventId);
        attendanceRepository.deleteAllByIdEvent(eventId);
        eventDataRepository.deleteById(eventId);
        notifyEventDeletion(eventData, courseNumber);
    }

    @Override
    public EventData getEventDataForUpdate(Long eventId) {
        return getEventDataById(eventId);
    }

    @Override
    public EventData updateEvent(Long eventId, EventData updatedEventData, Integer courseNumber) {
        EventData oldEventData = getEventDataById(eventId);
        EventData updatedEvent = updateEventData(eventId, updatedEventData);
        notifyEventUpdate(oldEventData, updatedEventData, courseNumber);
        return updatedEvent;
    }

    @Override
    public List<Integer> getAllCourseNumbers() {
        UserData user = userDataService.getLoggedInUser();
        Long idUser = user.getIdUser();
        return courseRepository.findCourseNumbersByUserId(idUser);
    }

    private void notifyEventDeletion(EventData eventData, Integer courseNumber) {
        List<UserData> learners = userDataRepository.findLearnersByCourseNumber(courseNumber);
        List<String> learnerEmails = learners.stream()
                .map(UserData::getEmail)
                .collect(Collectors.toList());

        String subject = "Evento eliminado: " + eventData.getObjective();
        String message = "El evento ha sido eliminado Detalles:\n" +
                "Fecha: " + eventData.getDate() + "\n" +
                "Ubicación: " + eventData.getLocation() + "\n" +
                "Hora de inicio: " + eventData.getStartTime() + "\n" +
                "Hora de finalización: " + eventData.getEndTime();

        emailService.sendEmail(learnerEmails.toArray(new String[0]), subject, message);
    }

    private void notifyEventUpdate(EventData oldEventData, EventData updatedEventData, Integer courseNumber) {
        List<UserData> learners = userDataRepository.findLearnersByCourseNumber(courseNumber);
        List<String> learnerEmails = learners.stream()
                .map(UserData::getEmail)
                .collect(Collectors.toList());

        String subject = "Evento actualizado: " + updatedEventData.getObjective();
        String message = "El evento ha sido actualizado Detalles actualizados:\n" +
                "Fecha anterior: " + oldEventData.getDate() + ", Nueva fecha: " + updatedEventData.getDate() + "\n" +
                "Ubicación anterior: " + oldEventData.getLocation() + ", Nueva ubicación: " + updatedEventData.getLocation() + "\n" +
                "Hora de inicio anterior: " + oldEventData.getStartTime() + ", Nueva hora de inicio: " + updatedEventData.getStartTime() + "\n" +
                "Hora de finalización anterior: " + oldEventData.getEndTime() + ", Nueva hora de finalización: " + updatedEventData.getEndTime();

        emailService.sendEmail(learnerEmails.toArray(new String[0]), subject, message);
    }
}
