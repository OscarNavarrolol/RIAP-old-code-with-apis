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
        const $dropdown = $('#courseDropdown');

        courseNumbers.forEach(number => {
            $dropdown.append(new Option(`Course ${number}`, number));
        });
    }

    async function fetchEventsByCourse(courseNumber) {
        try {
            const response = await fetch(`/api_event_data/list_event?courseNumber=${courseNumber}`);
            if (!response.ok) {
                throw new Error('Error fetching events');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    function displayEvents(events) {
        $("#add-btn-event").show();
        const $eventsTableBody = $('#eventsTable tbody');
        $eventsTableBody.empty();

        if (events.length === 0) {
            $eventsTableBody.append('<tr><td colspan="6">No events found for this course.</td></tr>');
        } else {
            events.forEach(event => {
                const $row = $('<tr></tr>').attr('id', `event-row-${event.idEvent}`);
            
                $row.append(`<td>${event.location}</td>`);
                $row.append(`<td>${event.objective}</td>`);
                $row.append(`<td>${new Date(event.date).toLocaleDateString()}</td>`);
                $row.append(`<td>${event.startTime}</td>`);
                $row.append(`<td>${event.endTime}</td>`);
            
                const $actionsCell = $('<td></td>');
            
                const $viewButton = $('<button class="view-btn"><img src="/images/iconView.png" class="action" alt="View"></button>');
                $viewButton.on('click', () => viewEvent(event.idEvent));
            
                const $editButton = $('<button class="edit-btn"><img src="/images/iconEdit.png" class="action" alt="Edit"></button>');
                $editButton.on('click', () => editEvent(event.idEvent, event, selectedCourseNumber)); // Usar la variable global
            
                const $deleteButton = $('<button class="delete-btn"><img src="/images/iconDelete.png" class="action" alt="Delete"></button>');
                $deleteButton.on('click', () => deleteEvent(event.idEvent, selectedCourseNumber)); // Usar la variable global
            
                $actionsCell.append($viewButton).append(' ').append($editButton).append(' ').append($deleteButton);
            
                $row.append($actionsCell);
                $eventsTableBody.append($row);
            });            
        }
    }

    $('#courseDropdown').on('change', async function () {
        selectedCourseNumber = $(this).val(); // Guardar el courseNumber seleccionado en la variable global
        if (selectedCourseNumber) {
            const events = await fetchEventsByCourse(selectedCourseNumber);
            displayEvents(events);
        } else {
            $('#eventsTable tbody').html('<tr><td colspan="3">Please select a course.</td></tr>');
        }
    });

    async function viewEvent(idEvent) {
        try {
            const response = await fetch(`/api_event_data/update_event/${idEvent}`);
            if (!response.ok) {
                throw new Error('Error fetching event details');
            }
            const eventDetails = await response.json();
    
            $('#eventDetails').html(`
                <strong>Location:</strong> ${eventDetails.location}<br>
                <strong>Objective:</strong> ${eventDetails.objective}<br>
                <strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString()}<br>
                <strong>Start Time:</strong> ${eventDetails.startTime}<br>
                <strong>End Time:</strong> ${eventDetails.endTime}<br>
            `);
    
            $('#eventModal').css('display', 'block');
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async function editEvent(idEvent, currentEventData, courseNumber) {
        if (!idEvent || !currentEventData || !courseNumber) {
            console.error('Invalid parameters:', { idEvent, currentEventData, courseNumber });
            return;
        }
    
        $('#editLocation').val(currentEventData.location);
        $('#editObjective').val(currentEventData.objective);
        $('#editDate').val(new Date(currentEventData.date).toISOString().split('T')[0]);
        $('#editStartTime').val(currentEventData.startTime);
        $('#editEndTime').val(currentEventData.endTime);
    
        $('#editEventModal').css('display', 'block');
    
        $('#saveEditBtn').off('click').on('click', async function () {
            const updatedEventData = {
                location: $('#editLocation').val(),
                objective: $('#editObjective').val(),
                date: $('#editDate').val(), 
                startTime: $('#editStartTime').val(),
                endTime: $('#editEndTime').val(),
            };
    
            try {
                const url = `/api_event_data/update_event/${idEvent}?courseNumber=${courseNumber}`;
                const response = await fetch(url, {
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
    
                $('#editEventModal').css('display', 'none');
    
                const events = await fetchEventsByCourse(courseNumber);
                displayEvents(events);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
    
    async function deleteEvent(idEvent, courseNumber) {
        if (!idEvent || !courseNumber) {
            console.error('Invalid parameters:', { idEvent, courseNumber });
            return;
        }
    
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`/api_event_data/delete_event/${idEvent}?courseNumber=${courseNumber}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    throw new Error('Error deleting event');
                }
    
                console.log('Event Deleted');
                $(`#event-row-${idEvent}`).remove();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }  
    
    async function addNewEvent(courseNumber) {
        const newEventData = {
            location: $('#newLocation').val(),
            objective: $('#newObjective').val(),
            date: $('#newDate').val(),
            startTime: $('#newStartTime').val(),
            endTime: $('#newEndTime').val(),
        };
    
        try {
            const url = `/api_event_data/create_event?courseNumber=${courseNumber}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEventData),
            });
    
            if (!response.ok) {
                throw new Error('Error saving new event');
            }
    
            const savedEvent = await response.json();
            console.log('Event Saved:', savedEvent);
    
            $('#addEventModal').css('display', 'none');
    
            const events = await fetchEventsByCourse(courseNumber);
            displayEvents(events);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    
    $(document).ready(function () {
        $('.close').on('click', function () {
            $('.modal').css('display', 'none');
        });
    
        $(window).on('click', function (event) {
            if (event.target.id === 'eventModal') {
                $('#eventModal').css('display', 'none');
            }
        });
    });

    $('#add-btn-event').on('click', function () {
        if (!selectedCourseNumber) {
            alert('Please select a course first.');
            return;
        }
    
        $('#addEventModal').css('display', 'block');
    
        $('#saveNewEventBtn').off('click').on('click', function () {
            addNewEvent(selectedCourseNumber);
        });
    });
    

    populateDropdown();
});
