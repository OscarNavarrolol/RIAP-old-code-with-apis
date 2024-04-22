package com.sena.riap.service.impl;

import com.sena.riap.entities.Attendance;
import com.sena.riap.entities.EventData;
import com.sena.riap.repository.AttendanceRepository;
import com.sena.riap.repository.EventDataRepository;
import com.sena.riap.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private EventData todayEvent = null;   // to save today's event

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EventDataRepository eventDataRepository;

    @Override
    public List<Attendance> getAttendance() {
        return attendanceRepository.findAll();
    }

    @Override
    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id).orElse(null);
    }

    @Override
    public Attendance updateAttendance(Long id, Attendance attendance) {

        Attendance oldAttendance = attendanceRepository.findById(id).orElse(null);
        if (oldAttendance != null) {
            oldAttendance.setIdEvent(attendance.getIdEvent());
            oldAttendance.setIdUser(attendance.getIdUser());
            oldAttendance.setAttendanceTime(attendance.getAttendanceTime());
            return attendanceRepository.save(oldAttendance);
        }
        return null;
    }

    @Override
    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    @Override
    public List<Attendance> getAttendancesByEventId(Long eventId) {
        return null;
    }

    @Override
    public List<Attendance> getAttendancesByUserId(Long userId) {
        return null;
    }

    // all the necessary methods
    @Override
    public void deleteAllByEventId(Long eventId) {
        attendanceRepository.deleteAllByIdEvent(eventId);
    }

    // take attendance methods

    @Override
    public List<EventData> getAllEvents() {
        return eventDataRepository.findAll();
    }

    // Find the event of the day
    @Override
    public EventData findTodayEvent(List<EventData> eventList) {

        if (todayEvent != null) {
            return todayEvent;
        }

        LocalDate today = LocalDate.now();

        for (EventData event : eventList) {
            LocalDate eventDate = event.getDate();
            if (eventDate.isEqual(today)) {
                todayEvent = event;
                return event;
            }
        }
        return null;
    }

    //receive the user id and try the method
    @Override
    public Attendance saveEventArrivalTime(Long idUser) {
        EventData todayEvent = findTodayEvent(getAllEvents());

        if (todayEvent != null) {
            Attendance attendanceRecord = attendanceRepository.findByIdUserAndIdEvent(idUser, todayEvent.getIdEvent());

            if (attendanceRecord != null && attendanceRecord.getIdEvent() == todayEvent.getIdEvent()) {
                LocalDateTime arrivalTime = LocalDateTime.now();
                attendanceRecord.setAttendanceTime(arrivalTime);
                return attendanceRepository.save(attendanceRecord);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

}
