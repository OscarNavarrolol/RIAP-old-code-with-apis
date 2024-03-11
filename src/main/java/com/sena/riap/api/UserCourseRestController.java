package com.sena.riap.api;


import com.sena.riap.entities.UserCourse;
import com.sena.riap.entities.UserData;
import com.sena.riap.service.UserCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserCourseRestController {

    @Autowired
    private UserCourseService userCourseService;

    @GetMapping("/user_course")
    public List<UserCourse> listUserCourse() {
        return userCourseService.getUserCourse();
    }

    @GetMapping("/user_course/{id_user_course}")
    public UserCourse getUserCourse(@PathVariable("id_user_course") Long idUserCourse) {
        return userCourseService.getUserCourseById(idUserCourse);
    }

    @PostMapping("/user_course")
    public UserCourse saveUserCourse(@RequestBody UserCourse userCourse) {
        return userCourseService.saveUserCourse(userCourse);
    }

    @PutMapping("/user_course/{id_user_course}")
    public UserCourse updateUserCourse(@PathVariable("id_user_course") Long idUserCourse, @RequestBody UserCourse userCourse) {
        return userCourseService.updateUserCourse(idUserCourse, userCourse);
    }

    @DeleteMapping("/user_course/{id_user_course}")
    public void deleteUserCourse(@PathVariable("id_user_course") Long idUserCourse) {
        userCourseService.deleteUserCourse(idUserCourse);
    }

}
