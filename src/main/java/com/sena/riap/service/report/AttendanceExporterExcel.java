package com.sena.riap.service.report;

import com.sena.riap.entities.Attendance;
import jakarta.servlet.ServletOutputStream;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

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
		cell.setCellValue("IdEvent");
		cell.setCellStyle(style);
		
		cell = row.createCell(2);
		cell.setCellValue("IdUser");
		cell.setCellStyle(style);
		
		cell = row.createCell(3);
		cell.setCellValue("AttendanceTime");
		cell.setCellStyle(style);

		/*
		cell = row.createCell(4);
		cell.setCellValue("Fecha");
		cell.setCellStyle(style);
		
		cell = row.createCell(5);
		cell.setCellValue("Telefono");
		cell.setCellStyle(style);
		
		cell = row.createCell(6);
		cell.setCellValue("Sexo");
		cell.setCellStyle(style);
		
		cell = row.createCell(7);
		cell.setCellValue("Salario");
		cell.setCellStyle(style);

		 */
	}
	
	private void writeTableData() {
		int numberRows = 1;
		
		CellStyle style = book.createCellStyle();
		XSSFFont font = book.createFont();
		font.setFontHeight(14);
		style.setFont(font);
		
		for(Attendance attendance : attendanceList) {
			Row fila = sheet.createRow(numberRows ++);
			
			Cell cell = fila.createCell(0);
			cell.setCellValue(attendance.getIdAttendance());
			sheet.autoSizeColumn(0);
			cell.setCellStyle(style);
			
			cell = fila.createCell(1);
			cell.setCellValue(attendance.getIdEvent());
			sheet.autoSizeColumn(1);
			cell.setCellStyle(style);
			
			cell = fila.createCell(2);
			cell.setCellValue(attendance.getIdUser());
			sheet.autoSizeColumn(2);
			cell.setCellStyle(style);
			
			cell = fila.createCell(3);
			cell.setCellValue(attendance.getAttendanceTime());
			sheet.autoSizeColumn(3);
			cell.setCellStyle(style);

			/*
			cell = fila.createCell(4);
			cell.setCellValue(attendance.getFecha().toString());
			sheet.autoSizeColumn(4);
			cell.setCellStyle(style);
			
			cell = fila.createCell(5);
			cell.setCellValue(attendance.getTelefono());
			sheet.autoSizeColumn(5);
			cell.setCellStyle(style);
			
			cell = fila.createCell(6);
			cell.setCellValue(attendance.getSexo());
			sheet.autoSizeColumn(6);
			cell.setCellStyle(style);
			
			cell = fila.createCell(7);
			cell.setCellValue(attendance.getSalario());
			sheet.autoSizeColumn(7);
			cell.setCellStyle(style);

			 */
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
