package com.sena.riap.service.impl;

import com.sena.riap.entities.UserData;

import com.sena.riap.repository.UserDataRepository;
import com.sena.riap.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDataServiceImpl implements UserDataService {

    private UserData loggedInUser;

    @Autowired
    private UserDataRepository userDataRepository;

    @Override
    public List<UserData> getUserData() {
        return userDataRepository.findAll();
    }

    @Override
    public UserData saveUserData(UserData userData) {
        return userDataRepository.save(userData);
    }

    @Override
    public UserData getUserDataById(Long id) {
        return userDataRepository.findById(id).orElse(null);
    }

    @Override
    public UserData updateUserData(Long id, UserData userData) {
        UserData oldUserData = userDataRepository.findById(id).orElse(null);

        if (oldUserData != null){
            oldUserData.setDocument(userData.getDocument());
            oldUserData.setAge(userData.getAge());
            oldUserData.setNameUser(userData.getNameUser());
            oldUserData.setEmail(userData.getEmail());
            oldUserData.setPhone(userData.getPhone());
            oldUserData.setRoleUser(userData.getRoleUser());
            oldUserData.setPassword(userData.getPassword());
            oldUserData.setProfilePicture(userData.getProfilePicture());
            return userDataRepository.save(oldUserData);
        }
        return null;
    }

    @Override
    public void deleteUserData(Long id) {
        userDataRepository.deleteById(id);
    }

    @Override
    public UserData loginUser(String document, String password) {
        UserData user = userDataRepository.findByDocumentAndPassword(document, password);

        if (user != null && user.getRoleUser().equals("admin")){
            loggedInUser = user;
            return user;
        }
        return null;
    }

    @Override
    public UserData getLoggedInUser() {
        return loggedInUser;
    }

    // complete methods
    @Override
    public List<UserData> getLearnersByCourseNumber(int courseNumber) {
        return userDataRepository.findLearnersByCourseNumber(courseNumber);
    }

    @Override
    public UserData findByEmail(String email) {
        return userDataRepository.findByEmail(email);
    }

    @Override
    public UserData findByRecoverKey(String key) {
        return userDataRepository.findByRecoverKey(key);
    }

    @Override
    public UserData updatePassword(Long idUser, String password){
        UserData oldUserData = userDataRepository.findById(idUser).orElse(null);
        if (oldUserData != null){
            oldUserData.setPassword(password);
            userDataRepository.save(oldUserData);
        }
        return null;
    }

}
