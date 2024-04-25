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
    // buscar las asistencias
    @Query(value = "SELECT a.id_attendance, a.id_event, a.id_user, a.attendance_time " +
            "FROM attendance a " +
            "INNER JOIN event_data e ON a.id_event = e.id_event " +
            "INNER JOIN user_data u ON a.id_user = u.id_user " +
            "INNER JOIN user_course uc ON u.id_user = uc.id_user " +
            "INNER JOIN course c ON uc.id_course = c.id_course " +
            "WHERE c.number_course =:courseNumber AND e.date_event =:eventDate ;", nativeQuery = true)
    List<Attendance> findByCourseAndDate (Integer courseNumber, LocalDate eventDate);

}
