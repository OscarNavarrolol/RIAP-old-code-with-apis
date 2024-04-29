package com.sena.riap.service.report;

import com.lowagie.text.Font;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.sena.riap.entities.Attendance;
import jakarta.servlet.http.HttpServletResponse;

import java.awt.*;
import java.io.IOException;
import java.util.List;

public class AttendanceExporterPDF {

	private List<Attendance> listAttendance;

	public AttendanceExporterPDF(List<Attendance> listAttendance) {
		super();
		this.listAttendance = listAttendance;
	}

	private void writeTableHeader(PdfPTable table) {
		PdfPCell cell = new PdfPCell();

		cell.setBackgroundColor(Color.BLUE);
		cell.setPadding(5);

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(Color.WHITE);

		cell.setPhrase(new Phrase("ID attendance", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Event objective", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Apprentice's name", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Arrival time", font));
		table.addCell(cell);

	}

	private void writeTableData(PdfPTable table) {
		for (Attendance attendance : listAttendance) {
			table.addCell(String.valueOf(attendance.getIdAttendance()));
			table.addCell(attendance.getEventName());
			table.addCell(attendance.getUserName());
			table.addCell(String.valueOf(attendance.getAttendanceTime()));
			// tabla.addCell(attendance.getFecha().toString());
		}
	}

	public void export(HttpServletResponse response) throws DocumentException, IOException {
		Document document = new Document(PageSize.A4);
		PdfWriter.getInstance(document, response.getOutputStream());

		document.open();

		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setColor(Color.BLUE);
		font.setSize(18);

		Paragraph title = new Paragraph("Event Attendance List", font);
		title.setAlignment(Paragraph.ALIGN_CENTER);
		document.add(title);

		PdfPTable table = new PdfPTable(4);
		table.setWidthPercentage(100);
		table.setSpacingBefore(15);
		table.setWidths(new float[] { 2.9f, 2.9f, 2.9f, 2.9f });
		table.setWidthPercentage(110);

		writeTableHeader(table);
		writeTableData(table);

		document.add(table);
		document.close();
	}
}
