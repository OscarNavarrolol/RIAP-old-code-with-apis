package com.sena.riap.api;


import com.sena.riap.entities.Course;
import com.sena.riap.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseRestController {

    @Autowired
    private CourseService courseService;


    @GetMapping("/course")
    public List<Course> listCourse() {
        return courseService.getCourse();
    }

    @GetMapping("/course/{id_course}")
    public Course getCourse(@PathVariable("id_course") Long idCourse) {
        return courseService.getCourseById(idCourse);
    }

    @PostMapping("/course")
    public Course saveCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    @PutMapping("/course/{id_course}")
    public Course updateCourse(@PathVariable("id_course") Long idCourse, @RequestBody Course course) {
        return courseService.updateCourse(idCourse, course);
    }

    @DeleteMapping("/course/{id_course}")
    public void deleteCourse(@PathVariable("id_course") Long idCourse) {
        courseService.deleteCourse(idCourse);
    }


}
