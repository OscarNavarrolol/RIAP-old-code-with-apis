package com.sena.riap.service;

import com.sena.riap.entities.UserData;

import java.util.List;

public interface UserDataService {

    public List<UserData> getUserData();

    public UserData saveUserData(UserData userData);

    public UserData getUserDataById(Long id);

    public UserData updateUserData(Long id, UserData userData);

    public void deleteUserData(Long id);

    public UserData loginUser(String document, String password);

    public UserData getLoggedInUser();

    List<UserData> getLearnersByCourseNumber(int courseNumber);

    public UserData findByEmail(String email);

    public UserData findByRecoverKey(String key);

    public UserData updatePassword(Long idUser, String password);

}
