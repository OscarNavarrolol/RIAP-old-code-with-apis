package com.sena.riap.service;

import com.sena.riap.entities.Attendance;
import com.sena.riap.entities.EventData;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {

    public List<Attendance> getAttendance();

    public Attendance saveAttendance(Attendance Attendance);

    public Attendance getAttendanceById(Long id);

    public Attendance updateAttendance(Long id,Attendance attendance);

    public void deleteAttendance (Long id);

    public List<Attendance> getAttendancesByEventId(Long eventId);

    public List<Attendance> getAttendancesByUserId(Long userId);

    public void deleteAllByEventId(Long eventId);

    public List<EventData> getAllEvents();

    public EventData findTodayEvent(List<EventData> eventList);

    public Attendance saveEventArrivalTime(Long idUser);

    public List<LocalDate> listEventsByCourse(Integer courseNumber);

    public List<Attendance> listAttendanceByCourse (Integer courseNumber, LocalDate eventDate);

  /*
    public void generateExcel(List<Attendance> attendanceList); //
   */
}
