package com.sena.riap.service.report;

import com.sena.riap.entities.Attendance;
import jakarta.servlet.ServletOutputStream;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import java.time.ZoneId;
import java.util.Date;

// Handles exporting attendance data to an Excel file.
public class AttendanceExporterExcel {

    private XSSFWorkbook book;
    private XSSFSheet sheet;
    private List<Attendance> attendanceList;

    public AttendanceExporterExcel(List<Attendance> attendanceList) {
        this.attendanceList = attendanceList;
        book = new XSSFWorkbook();
        sheet = book.createSheet("Attendances");
    }

    // Creates a style for header cells.
    private CellStyle createHeaderStyle() {
        CellStyle style = book.createCellStyle();
        XSSFFont font = book.createFont();
        font.setFontName("Bahnschrift semibold condensed");
        style.setAlignment(HorizontalAlignment.CENTER);
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        return style;
    }

    // Creates a style for data cells.
    private CellStyle createDataStyle() {
        CellStyle style = book.createCellStyle();
        XSSFFont font = book.createFont();
        font.setFontName("Bahnschrift Light condensed");
        font.setFontHeight(14);
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }

    // Creates a style for date cells.
    private CellStyle createDateCellStyle() {
        CellStyle dateCellStyle = book.createCellStyle();
        dateCellStyle.setDataFormat(book.getCreationHelper().createDataFormat().getFormat("dd/MM/yyyy HH:mm:ss"));
        XSSFFont fontDate = book.createFont();
        fontDate.setFontName("Bahnschrift Light condensed");
        fontDate.setFontHeight(13);
        dateCellStyle.setFont(fontDate);
        dateCellStyle.setAlignment(HorizontalAlignment.CENTER);
        return dateCellStyle;
    }

    // Writes the header row of the Excel sheet.
    private void writeTableHeader() {
        Row row = sheet.createRow(0);
        CellStyle headerStyle = createHeaderStyle();
        Cell cell;
        cell = row.createCell(0);
        cell.setCellValue("IdAttendance");
        cell.setCellStyle(headerStyle);
        cell = row.createCell(1);
        cell.setCellValue("Objective Event");
        cell.setCellStyle(headerStyle);
        cell = row.createCell(2);
        cell.setCellValue("Name User");
        cell.setCellStyle(headerStyle);
        cell = row.createCell(3);
        cell.setCellValue("AttendanceTime");
        cell.setCellStyle(headerStyle);
    }

    // Writes the data rows of the Excel sheet.
    private void writeTableData() {
        int numberRows = 1;
        CellStyle dataStyle = createDataStyle();
        CellStyle dateCellStyle = createDateCellStyle();
        for (Attendance attendance : attendanceList) {
            Row fila = sheet.createRow(numberRows++);
            Cell cell = fila.createCell(0);
            cell.setCellValue(attendance.getIdAttendance());
            cell.setCellStyle(dataStyle);
            cell = fila.createCell(1);
            cell.setCellValue(attendance.getEventName());
            cell.setCellStyle(dataStyle);
            cell = fila.createCell(2);
            cell.setCellValue(attendance.getUserName());
            cell.setCellStyle(dataStyle);
            cell = fila.createCell(3);
            cell.setCellValue(attendance.getAttendanceTime());
            cell.setCellStyle(dateCellStyle);
        }
        // Autofit columns after adding all data
        for (int i = 0; i < 4; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    public void export(HttpServletResponse response) throws IOException {
        writeTableHeader();
        writeTableData();
        ServletOutputStream outPutStream = response.getOutputStream();
        book.write(outPutStream);
        book.close();
        outPutStream.close();
    }
}
