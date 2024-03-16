package com.sena.riap.api;

import com.sena.riap.entities.Course;
import com.sena.riap.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RequestMapping("/api_course")
public class CourseRestController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/list_course")
    public List<Course> listCourse() {
        return courseService.getCourse();
    }

    @GetMapping("/find/{id_course}")
    public Course getCourse(@PathVariable("id_course") Long idCourse) {
        return courseService.getCourseById(idCourse);
    }

    @PostMapping("/save")
    public Course saveCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    @PutMapping("/update/{id_course}")
    public Course updateCourse(@PathVariable("id_course") Long idCourse, @RequestBody Course course) {
        return courseService.updateCourse(idCourse, course);
    }

    @DeleteMapping("/delete/{id_course}")
    public void deleteCourse(@PathVariable("id_course") Long idCourse) {
        courseService.deleteCourse(idCourse);
    }

}
