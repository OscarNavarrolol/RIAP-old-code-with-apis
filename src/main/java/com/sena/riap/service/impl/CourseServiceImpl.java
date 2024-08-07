package com.sena.riap.service.impl;

import com.sena.riap.entities.Course;
import com.sena.riap.repository.CourseRepository;
import com.sena.riap.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Course> getCourse() {
        return courseRepository.findAll();
    }

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public Course updateCourse(Long id, Course course) {
        Course oldCourse = courseRepository.findById(id).orElse(null);
        if (oldCourse != null){
            oldCourse.setIdProgram(course.getIdProgram());
            oldCourse.setNumber(course.getNumber());
            return courseRepository.save(oldCourse);
        }
        return null;
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    //complete method
    @Override
    public List<Integer> getCoursesByUser(Long userId) {
        return courseRepository.findCourseNumbersByUserId(userId);
    }
}
