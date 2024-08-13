  // Function to fetch courses and populate the dropdown
  async function loadCourses() {
    try {
        const response = await fetch('http://localhost:8080/api_event_data/course_numbers'); // Replace with your API endpoint
        const courses = await response.json();
        
        const dropdown = document.getElementById('courseDropdown');
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = `Course ${course}`;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

// Call the function to load courses when the page loads
document.addEventListener('DOMContentLoaded', loadCourses);