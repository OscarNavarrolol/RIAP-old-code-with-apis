package com.sena.riap.controller;


import com.sena.riap.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping({"/","/user_data"})
public class ControllerUserData {

    @Autowired
    private UserDataService userDataService;

    @GetMapping("/tables")
    public String tablesGeneral() {
        return "admin/principal/ListUsers";
    }

    @GetMapping("/about_us")
    public String getAboutUsPage(){
        return "general/AboutUs";
    }

    @GetMapping("/login")
    public String getLoginPage(){
        return "general/Login";
    }

    @GetMapping
    public String getHomePage(){
        return "general/HomePage";
    }

}