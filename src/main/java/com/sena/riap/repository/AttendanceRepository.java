package com.sena.riap.repository;

import com.sena.riap.entities.Attendance;
import com.sena.riap.entities.EventData;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    @Transactional
    void deleteAllByIdEvent(Long eventId);

    public Attendance findByUserIdAndEventId(Long idUser,Long idEvent);

}
