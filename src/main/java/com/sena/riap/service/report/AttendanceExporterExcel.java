package com.sena.riap.service.report;

import com.sena.riap.entities.Attendance;
import jakarta.servlet.ServletOutputStream;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.time.ZoneId;
import java.util.Date;


public class AttendanceExporterExcel {

	private XSSFWorkbook book;
	private XSSFSheet sheet;

	private List<Attendance> attendanceList;

	public AttendanceExporterExcel(List<Attendance> attendanceList) {
		this.attendanceList = attendanceList;
		book = new XSSFWorkbook();
		sheet = book.createSheet("Attendances");
	}

	private void writeTableHeader() {
		Row row = sheet.createRow(0);

		CellStyle style = book.createCellStyle();
		XSSFFont font = book.createFont();


		font.setBold(true);
		font.setFontHeight(16);
		style.setFont(font);
		
		Cell cell = row.createCell(0);
		cell.setCellValue("IdAttendance");
		cell.setCellStyle(style);
		
		cell = row.createCell(1);
		cell.setCellValue("Objective Event");
		cell.setCellStyle(style);
		
		cell = row.createCell(2);
		cell.setCellValue("Name User");
		cell.setCellStyle(style);
		
		cell = row.createCell(3);
		cell.setCellValue("AttendanceTime");
		cell.setCellStyle(style);

	}
	
	private void writeTableData() {
		int numberRows = 1;
		
		CellStyle style = book.createCellStyle();
		XSSFFont font = book.createFont();
		CellStyle dateCellStyle = book.createCellStyle();
		CreationHelper createHelper = book.getCreationHelper();
		dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd/MM/yyyy HH:mm:ss"));
		font.setFontHeight(14);
		style.setFont(font);
		
		for(Attendance attendance : attendanceList) {
			Row fila = sheet.createRow(numberRows ++);
			
			Cell cell = fila.createCell(0);
			cell.setCellValue(attendance.getIdAttendance());
			sheet.autoSizeColumn(0);
			cell.setCellStyle(style);
			
			cell = fila.createCell(1);
			cell.setCellValue(attendance.getEventName());
			sheet.autoSizeColumn(1);
			cell.setCellStyle(style);
			
			cell = fila.createCell(2);
			cell.setCellValue(attendance.getUserName());
			sheet.autoSizeColumn(2);
			cell.setCellStyle(style);
			
			cell = fila.createCell(3);
			cell.setCellValue(attendance.getAttendanceTime());
			sheet.autoSizeColumn(3);
			cell.setCellStyle(dateCellStyle);
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
