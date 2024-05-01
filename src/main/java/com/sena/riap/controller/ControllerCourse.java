package com.sena.riap.controller;

import com.sena.riap.entities.Attendance;
import com.sena.riap.entities.Course;
import com.sena.riap.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/course")
public class ControllerCourse {

    @GetMapping("/get_course")
    public String getMethodName() {
        return "admin/principal/FormCourse";
    }
    
}
