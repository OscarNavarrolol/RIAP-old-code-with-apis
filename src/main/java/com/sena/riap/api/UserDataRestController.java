package com.sena.riap.api;

import com.sena.riap.entities.UserData;
import com.sena.riap.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api_user")
public class UserDataRestController {

    @Autowired
    private UserDataService userDataService;

    @GetMapping("/list_user")
    public List<UserData> listUserData() {
        return userDataService.getUserData();
    }

    @GetMapping("/find/{id_user}")
    public UserData getUserData(@PathVariable("id_user") Long idUser) {
        return userDataService.getUserDataById(idUser);
    }

    @PostMapping("/save")
    public UserData saveUserData(@RequestBody UserData userData) {
        return userDataService.saveUserData(userData);
    }

    @PutMapping("/update/{id_user}")
    public UserData updateUserData(@PathVariable("id_user") Long idUser, @RequestBody UserData userData) {
        return userDataService.updateUserData(idUser, userData);
    }

    @DeleteMapping("/delete/{id_user}")
    public void deleteUserData(@PathVariable("id_user") Long idUser) {
        userDataService.deleteUserData(idUser);
    }

    // METHODS REQUIRED FOR THE PROJECT

    // Returns the user object corresponding to the correct credentials
    @PostMapping("/auth")
    public UserData verifyCredentials(@RequestParam String document, @RequestParam String password){
        return userDataService.loginUser(document,password);
    }

    // method to update the user's password based on their ID, the ID is provided by MailController
    @PutMapping("/update_password/{id_user}")
    public UserData updatePassword(@PathVariable("id_user") Long idUser, @RequestParam String password) {
        return userDataService.updatePassword(idUser,password);
    }


}
