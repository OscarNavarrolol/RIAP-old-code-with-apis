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

// Handles exporting attendance data to a PDF file.
public class AttendanceExporterPDF {

    private List<Attendance> listAttendance;

    public AttendanceExporterPDF(List<Attendance> listAttendance) {
        super();
        this.listAttendance = listAttendance;
    }

    // Writes the table header.
    private void writeTableHeader(PdfPTable table) {
        // Add header cells for each column.
        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);
        font.setStyle(Font.BOLD);

        addCellHeader(table, "ID attendance", font);
        addCellHeader(table, "Event objective", font);
        addCellHeader(table, "Apprentice's name", font);
        addCellHeader(table, "Arrival time", font);
    }

    // Adds a header cell to the table.
    private void addCellHeader(PdfPTable table, String content, Font font) {
        // Adds a header cell with specified content and font.
        font.setSize(13);
        PdfPCell cell = new PdfPCell(new Phrase(content, font));
        cell.setBackgroundColor(Color.getHSBColor(0.3f, 0.7f, 0.7f));
        cell.setPadding(15);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_CENTER);
        table.addCell(cell);
    }

    // Writes the table data.
    private void writeTableData(PdfPTable table) {
        // Adds data cells for each attendance record.
        for (Attendance attendance : listAttendance) {
            table.addCell(createCellCenter(String.valueOf(attendance.getIdAttendance())));
            table.addCell(createCellCenter(attendance.getEventName()));
            table.addCell(createCellCenter(attendance.getUserName()));
            table.addCell(createCellCenter(String.valueOf(attendance.getAttendanceTime())));
        }
    }

    // Creates a cell with centered content.
    private PdfPCell createCellCenter(String content) {
        // Creates a PdfPCell with centered content.
        PdfPCell cell = new PdfPCell();
        cell.setPhrase(new Phrase(content));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_CENTER);
        return cell;
    }

    // Exports attendance data to a PDF file.
    public void export(HttpServletResponse response) throws DocumentException, IOException {
        // Generates and exports the PDF document.
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setColor(Color.getHSBColor(0.3f, 0.7f, 0.7f));
        font.setSize(18);

        Paragraph title = new Paragraph("Event Attendance List", font);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setSpacingBefore(15);
        table.setWidths(new float[]{2.9f, 2.9f, 2.9f, 2.9f});
        table.setWidthPercentage(110);

        writeTableHeader(table);
        writeTableData(table);

        document.add(table);
        document.close();
    }
}
