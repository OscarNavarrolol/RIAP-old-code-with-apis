package com.sena.riap.api;

import com.lowagie.text.DocumentException;
import com.sena.riap.entities.Attendance;
import com.sena.riap.service.AttendanceService;
import com.sena.riap.service.report.AttendanceExporterExcel;
import com.sena.riap.service.report.AttendanceExporterPDF;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
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

    @PutMapping("/take_attendance/{document}")
    public void takeAttendance(@PathVariable("document") String document) {
        attendanceService.saveEventArrivalTime(document);
    }

    // event dates by course number, there is already a method to bring the courses by admin
    @GetMapping("/event_dates")
    public List<LocalDate> getEventDatesByCourse(@RequestParam(required = false) Integer courseNumber) {
        return attendanceService.listEventsByCourse(courseNumber);
    }

    @GetMapping("/attendance_course")
    public List<Attendance> getAttendanceCD(@RequestParam Integer courseNumber, @RequestParam LocalDate eventDate) {
        return attendanceService.listAttendanceByCourse(courseNumber, eventDate);
    }

    @GetMapping("/export_excel")
    public void exportAttendanceInXlsx(HttpServletResponse response, @RequestParam Integer courseNumber, @RequestParam LocalDate eventDate) throws IOException {
        // response.setContentType("application/octet-stream");
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HHmmss");  // "yyyy-MM-dd_HH:mm:ss"
        String currentDate = dateFormatter.format(new Date());

        String header = "Content-Disposition";
        String value = "attachment; filename=Attendance_" + currentDate + ".xlsx";

        response.setHeader(header, value);

        List<Attendance> attendanceList = getAttendanceCD(courseNumber, eventDate);

        AttendanceExporterExcel exporter = new AttendanceExporterExcel(attendanceList);
        exporter.export(response);
    }

    @GetMapping("/export_pdf")
    public void exportAttendanceInPDF(HttpServletResponse response, @RequestParam Integer courseNumber, @RequestParam LocalDate eventDate) throws DocumentException, IOException {
        response.setContentType("application/pdf");

        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HHmmss");
        String today = dateFormatter.format(new Date());

        String header = "Content-Disposition";
        String value = "attachment; filename=Attendance_" + today + ".pdf";

        response.setHeader(header, value);

        List<Attendance> attendanceList = getAttendanceCD(courseNumber, eventDate);

        AttendanceExporterPDF exporter = new AttendanceExporterPDF(attendanceList);
        exporter.export(response);
    }

}
