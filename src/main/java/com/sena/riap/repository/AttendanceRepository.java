package com.sena.riap.repository;

import com.sena.riap.entities.Attendance;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    @Transactional
    void deleteAllByIdEvent(Long eventId);

    public Attendance findByIdUserAndIdEvent(Long idUser,Long idEvent);

    @Query(value = "SELECT * FROM attendance a " +
            "JOIN event_data e ON a.id_event = e.id_event " +
            "JOIN course c ON e.id_event = c.id_course " +
            "WHERE c.number_course =:courseNumber  AND e.date_event =:eventDate", nativeQuery = true)
    List<Attendance> findByCourseAndDate (int courseNumber, LocalDate eventDate);

}
