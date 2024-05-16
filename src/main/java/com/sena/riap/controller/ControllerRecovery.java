package com.sena.riap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/recovery")
public class ControllerRecovery {

    @GetMapping("/get_recovery")
    public String getMethodName() {
        return "admin/principal/FormRecovery";
    }
    
}
