package com.sena.riap.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
@RequestMapping("/user_data")
public class ControllerUserData {

    @GetMapping("/get_user_data")
    public String getMethodName() {
        return "admin/principal/FormUserData";
    }
    

    @GetMapping("/tables")
    public String tablesGeneral() {
        return "admin/principal/index";
    }

    @GetMapping("/login")
    public String getLoginPage(){
        return "general/Login1";
    }

    @GetMapping("/restore")
    public String getRestorePage(){
        return "general/Restore";
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/login";
    }

    @GetMapping("/principal")
    public String showPrincipalPage(){
        return "general/index";
    }

    @GetMapping("/about")
    public String getMethodAbouts() {
        return "general/about";
    }
}