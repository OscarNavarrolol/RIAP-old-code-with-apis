package com.sena.riap.api;

import com.sena.riap.entities.Attendance;
import com.sena.riap.service.AttendanceService;
import com.sena.riap.service.EventDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api_attendance")
public class AttendanceRestController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/list_attendance")
    public List<Attendance> listAttendance() {
        return attendanceService.getAttendance();
    }

    @GetMapping("/find/{id_attendance}")
    public Attendance getAttendance(@PathVariable("id_attendance") Long idAttendance) {
        return attendanceService.getAttendanceById(idAttendance);
    }

    @PostMapping("/save")
    public Attendance saveAttendance(@RequestBody Attendance attendance) {
        return attendanceService.saveAttendance(attendance);
    }

    @PutMapping("/update/{id_attendance}")
    public Attendance updateAttendance(@PathVariable("id_attendance") Long idAttendance, @RequestBody Attendance attendance) {
        return attendanceService.updateAttendance(idAttendance, attendance);
    }

    @DeleteMapping("/delete/{id_attendance}")
    public void deleteAttendance(@PathVariable("id_attendance") Long idAttendance) {
        attendanceService.deleteAttendance(idAttendance);
    }

    // METHODS REQUIRED FOR THE PROJECT

    @PutMapping("/take_attendance/{id_user}")
    public void takeAttendance(@PathVariable("id_user") Long idUser){
        attendanceService.saveEventArrivalTime(idUser);
    }

    // fechas de eventos por numero de curso, ya existe metodo para traer los cursos por admin
    @GetMapping("/event_dates")
    public List<LocalDate> getEventDatesByCourse(@RequestParam(required = false) Integer courseNumber) {
        return attendanceService.listEventsByCourse(courseNumber);
    }

    @GetMapping("/attendance_course")
    public List<Attendance> getAttendanceCD(@RequestParam Integer courseNumber,@RequestParam LocalDate eventDate){
        return attendanceService.listAttendanceByCourse(courseNumber,eventDate);
    }

}
