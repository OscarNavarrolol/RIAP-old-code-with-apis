$(document).ready(function () {
    let selectedCourseNumber = null;

    async function fetchCourseNumbers() {
        try {
            const response = await fetch('/api_event_data/course_numbers');
            if (!response.ok) {
                throw new Error('Error fetching course numbers');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async function populateDropdown() {
        const courseNumbers = await fetchCourseNumbers();
        const $courseDropdown = $('#courseDropdown');
        $courseDropdown.empty();  // Vaciar el dropdown antes de llenarlo

        courseNumbers.forEach(number => {
            $courseDropdown.append(new Option(`Select Course`));
        });
    }

    async function fetchEventDatesByCourse(courseNumber) {
        try {
            const response = await fetch(`/api_attendance/event_dates?courseNumber=${courseNumber}`);
            if (!response.ok) {
                throw new Error('Error fetching event dates');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async function populateDateDropdown(courseNumber) {
        const eventDates = await fetchEventDatesByCourse(courseNumber);
        const $dateDropdown = $('#dateDropdown');
        $dateDropdown.empty().prop('disabled', false);

        // Añadir opción inicial
        $dateDropdown.append(new Option('Select Date'));

        eventDates.forEach(date => {
            $dateDropdown.append(new Option(date, date));
        });
    }

    async function fetchAttendance(courseNumber, eventDate) {
        try {
            const response = await fetch(`/api_attendance/attendance_course?courseNumber=${courseNumber}&eventDate=${eventDate}`);
            if (!response.ok) {
                throw new Error('Error fetching attendance');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return new Intl.DateTimeFormat('en-GB', options).format(date);  // Formato de 24 horas
    }

    async function populateAttendanceTable(courseNumber, eventDate) {
        const attendanceData = await fetchAttendance(courseNumber, eventDate);
        const $attendanceTableBody = $('#attendanceTable tbody');
        $attendanceTableBody.empty(); // Limpiar la tabla antes de llenarla
    
        attendanceData.forEach(attendance => {
            // Verificar si la fecha de asistencia es null o vacía
            const formattedTime = attendance.attendanceTime
                ? formatDateTime(attendance.attendanceTime)
                : 'No asistió';
    
            const row = `<tr>
                            <td>${attendance.userName}</td>
                            <td>${attendance.eventName}</td>
                            <td>${formattedTime}</td>
                        </tr>`;
            $attendanceTableBody.append(row);
        });
    }
    
    

    $('#courseDropdown').on('change', function () {
        selectedCourseNumber = $(this).val();
        if (selectedCourseNumber) {
            populateDateDropdown(selectedCourseNumber);
        } else {
            $('#dateDropdown').empty().prop('disabled', true);
        }
    });

    $('#dateDropdown').on('change', function () {
        const selectedDate = $(this).val();
        if (selectedDate && selectedCourseNumber) {
            populateAttendanceTable(selectedCourseNumber, selectedDate);
        }
    });

    // Inicializar el dropdown de cursos
    populateDropdown();
});
