package com.sena.riap.api;

import com.sena.riap.entities.UserData;
import com.sena.riap.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserDataRestController {

    @Autowired
    private UserDataService userDataService;

    @GetMapping("/user")
    public List<UserData> listUserData() {
        return userDataService.getUserData();
    }

    @GetMapping("/user/{id_user}")
    public UserData getUserData(@PathVariable("id_user") Long idUser) {
        return userDataService.getUserDataById(idUser);
    }

    @PostMapping("/user")
    public UserData saveUserData(@RequestBody UserData userData) {
        return userDataService.saveUserData(userData);
    }

    @PutMapping("/user/{id_user}")
    public UserData updateUserData(@PathVariable("id_user") Long idUser, @RequestBody UserData userData) {
        return userDataService.updateUserData(idUser, userData);
    }

    @DeleteMapping("/user/{id_user}")
    public void deleteUserData(@PathVariable("id_user") Long idUser) {
        userDataService.deleteUserData(idUser);
    }

}
