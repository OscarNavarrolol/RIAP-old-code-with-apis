package com.sena.riap.api;

import com.sena.riap.entities.UserCourse;
import com.sena.riap.service.UserCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api_user_course")
public class UserCourseRestController {

    @Autowired
    private UserCourseService userCourseService;

    @GetMapping("/list_user_course")
    public List<UserCourse> listUserCourse() {
        return userCourseService.getUserCourse();
    }

    @GetMapping("/find/{id_user_course}")
    public UserCourse getUserCourse(@PathVariable("id_user_course") Long idUserCourse) {
        return userCourseService.getUserCourseById(idUserCourse);
    }

    @PostMapping("/save")
    public UserCourse saveUserCourse(@RequestBody UserCourse userCourse) {
        return userCourseService.saveUserCourse(userCourse);
    }

    @PutMapping("/update/{id_user_course}")
    public UserCourse updateUserCourse(@PathVariable("id_user_course") Long idUserCourse, @RequestBody UserCourse userCourse) {
        return userCourseService.updateUserCourse(idUserCourse, userCourse);
    }

    @DeleteMapping("/delete/{id_user_course}")
    public void deleteUserCourse(@PathVariable("id_user_course") Long idUserCourse) {
        userCourseService.deleteUserCourse(idUserCourse);
    }

    // METHODS REQUIRED FOR THE PROJECT
}
