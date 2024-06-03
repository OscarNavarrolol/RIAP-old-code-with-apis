package com.sena.riap.service.impl;

import com.sena.riap.entities.UserCourse;
import com.sena.riap.repository.UserCourseRepository;
import com.sena.riap.service.UserCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserCourseServiceImpl implements UserCourseService {

    @Autowired
    private UserCourseRepository userCourseRepository;

    @Override
    public List<UserCourse> getUserCourse() {
        return userCourseRepository.findAll();
    }

    @Override
    public UserCourse saveUserCourse(UserCourse userCourse) {
        return userCourseRepository.save(userCourse);
    }

    @Override
    public UserCourse getUserCourseById(Long id) {
        return userCourseRepository.findById(id).orElse(null);
    }

    @Override
    public UserCourse updateUserCourse(Long id, UserCourse userCourse) {

        UserCourse oldUserCourse = userCourseRepository.findById(id).orElse(null);
        if (oldUserCourse != null){
            oldUserCourse.setIdCourse(userCourse.getIdCourse());
            oldUserCourse.setIdUser(userCourse.getIdUser());
            return userCourseRepository.save(oldUserCourse);
        }
        return null;
    }

    @Override
    public void deleteUserCourse(Long id) {
        userCourseRepository.deleteById(id);
    }

    @Override
    public List<UserCourse> getUserCourseByRecordId(Long recordId) {
        return null;
    }

    @Override
    public List<UserCourse> getUserCourseByUserId(Long userId) {
        return null;
    }
}
