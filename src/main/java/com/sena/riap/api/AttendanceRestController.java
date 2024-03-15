package com.sena.riap.api;

import com.sena.riap.entities.Attendance;
import com.sena.riap.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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

}
