package com.sena.riap.controller;

import com.sena.riap.entities.Course;
import com.sena.riap.entities.EventData;
import com.sena.riap.service.EventDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/event_data")
public class ControllerEventData {

    @GetMapping("/get_event")
    public String getMethodName() {
        return "admin/principal/FormEvent";
    }
    
}
