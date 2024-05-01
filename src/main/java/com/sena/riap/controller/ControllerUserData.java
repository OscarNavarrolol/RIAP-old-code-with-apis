package com.sena.riap.controller;


import com.sena.riap.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/user_data")
public class ControllerUserData {

    @Autowired
    private UserDataService userDataService;

    @GetMapping("/get_user_data")
    public String getMethodName() {
        return "admin/principal/FormUserData";
    }
    

    @GetMapping("/tables")
    public String tablesGeneral() {
        return "admin/principal/index";
    }

    @GetMapping("/about_us")
    public String getAboutUsPage(){
        return "general/AboutUs";
    }

    @GetMapping("/login")
    public String getLoginPage(){
        return "general/Login";
    }

    @GetMapping("/home")
    public String getHomePage(){
        return "general/HomePage";
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/login";
    }

    @GetMapping("/principal")
    public String showPrincipalPage(){
        return "admin/principal/PrincipalAdmin";
    }

}