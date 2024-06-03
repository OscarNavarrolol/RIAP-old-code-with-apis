package com.sena.riap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/course")
public class ControllerCourse {

    @GetMapping("/get_course")
    public String getMethodName() {
        return "admin/principal/FormCourse";
    }
    
}
