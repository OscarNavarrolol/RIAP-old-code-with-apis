package com.sena.riap.controller;


import com.sena.riap.entities.Program;
import com.sena.riap.entities.UserCourse;
import com.sena.riap.service.UserCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/user_course")
public class ControllerUserCourse {

    @GetMapping("/get_user_course")
    public String getMethodName() {
        return "admin/principal/FormUserCourse";
    }
    
}
