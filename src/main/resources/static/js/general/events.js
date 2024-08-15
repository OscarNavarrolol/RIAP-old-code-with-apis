async function fetchCourseNumbers() {
    try {
        const response = await fetch('/api_event_data/course_numbers');
        if (!response.ok) {
            throw new Error('Error fetching course numbers');
        }
        const courseNumbers = await response.json();
        return courseNumbers;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

async function populateDropdown() {
    const courseNumbers = await fetchCourseNumbers();

    const dropdown = document.getElementById('courseDropdown');
    courseNumbers.forEach(number => {
        const option = document.createElement('option');
        option.value = number;
        option.text = `Course ${number}`;
        dropdown.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', populateDropdown);

async function fetchEventsByCourse(courseNumber) {
    try {
        const response = await fetch(`/api_event_data/list_event?courseNumber=${courseNumber}`);
        if (!response.ok) {
            throw new Error('Error fetching events');
        }
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

function displayEvents(events) {
    const eventsTableBody = document.getElementById('eventsTable').querySelector('tbody');
    eventsTableBody.innerHTML = ''; // Limpia los eventos anteriores

    if (events.length === 0) {
        eventsTableBody.innerHTML = '<tr><td colspan="6">No events found for this course.</td></tr>';
    } else {
        events.forEach(event => {
            const row = document.createElement('tr');

            const locationCell = document.createElement('td');
            locationCell.textContent = event.location;

            const objectiveCell = document.createElement('td');
            objectiveCell.textContent = event.objective;

            const dateCell = document.createElement('td');
            dateCell.textContent = new Date(event.date).toLocaleDateString();

            const startCell = document.createElement('td');
            startCell.textContent = event.startTime;

            const endCell = document.createElement('td');
            endCell.textContent = event.endTime;

            const actionsCell = document.createElement('td');

            const viewIcon = document.createElement('i');
            viewIcon.className = 'fas fa-eye';
            viewIcon.style.cursor = 'pointer';
            viewIcon.addEventListener('click', () => viewEvent(event.idEvent));

            const editIcon = document.createElement('i');
            editIcon.className = 'fas fa-edit';
            editIcon.style.cursor = 'pointer';
            editIcon.addEventListener('click', () => editEvent(event.id, event, event.courseNumber));

            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fas fa-trash';
            deleteIcon.style.cursor = 'pointer';
            deleteIcon.addEventListener('click', () => deleteEvent(event.id, event.courseNumber));

            actionsCell.appendChild(viewIcon);
            actionsCell.appendChild(document.createTextNode(' '));
            actionsCell.appendChild(editIcon);
            actionsCell.appendChild(document.createTextNode(' '));
            actionsCell.appendChild(deleteIcon);

            row.appendChild(locationCell);
            row.appendChild(objectiveCell);
            row.appendChild(dateCell);
            row.appendChild(startCell);
            row.appendChild(endCell);
            row.appendChild(actionsCell);

            eventsTableBody.appendChild(row);
        });
    }
}

document.getElementById('courseDropdown').addEventListener('change', async function() {
    const selectedCourseNumber = this.value;
    if (selectedCourseNumber) {
        const events = await fetchEventsByCourse(selectedCourseNumber);
        displayEvents(events);
    } else {
        document.getElementById('eventsTable').querySelector('tbody').innerHTML = '<tr><td colspan="3">Please select a course.</td></tr>';
    }
});

async function viewEvent(idEvent) {
    try {
        const response = await fetch(`/api_event_data/update_event/${idEvent}`);
        if (!response.ok) {
            throw new Error('Error fetching event details');
        }
        const eventDetails = await response.json();
        console.log('Event Details:', eventDetails);
        // Aquí puedes mostrar los detalles en un modal o en una sección de tu página
    } catch (error) {
        console.error('Error:', error);
    }
}


async function editEvent(idEvent, updatedEventData, courseNumber) {
    try {
        const response = await fetch(`/api_event_data/update_event/${idEvent}?courseNumber=${courseNumber}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEventData),
        });
        if (!response.ok) {
            throw new Error('Error updating event');
        }
        const updatedEvent = await response.json();
        console.log('Event Updated:', updatedEvent);
        // Aquí puedes actualizar la tabla con los nuevos datos o mostrar un mensaje de éxito
    } catch (error) {
        console.error('Error:', error);
    }
}


async function deleteEvent(idEvent, courseNumber) {
    if (confirm('Are you sure you want to delete this event?')) {
        try {
            const response = await fetch(`/api_event_data/delete_event/${idEvent}?courseNumber=${courseNumber}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting event');
            }
            console.log('Event Deleted');
            // Aquí puedes eliminar la fila correspondiente de la tabla o mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error:', error);
        }
    }
}





