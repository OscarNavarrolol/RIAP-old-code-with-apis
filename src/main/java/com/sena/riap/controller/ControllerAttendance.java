package com.sena.riap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequestMapping("/attendance")
public class ControllerAttendance {

    @GetMapping("/get_attendance")
    public String getAttendance() {
        return "admin/principal/FormAttendance";
    }
    
    
}
