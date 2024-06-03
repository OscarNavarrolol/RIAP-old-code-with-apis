package com.sena.riap.controller;


import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/user_course")
public class ControllerUserCourse {

    @GetMapping("/get_user_course")
    public String getMethodName() {
        return "admin/principal/FormUserCourse";
    }
    
}
