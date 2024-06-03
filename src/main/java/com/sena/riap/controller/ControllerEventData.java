package com.sena.riap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/event_data")
public class ControllerEventData {

    @GetMapping("/get_event")
    public String getMethodName() {
        return "admin/principal/FormEvent";
    }
    
}
