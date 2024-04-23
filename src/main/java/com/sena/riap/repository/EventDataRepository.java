package com.sena.riap.repository;

import com.sena.riap.entities.EventData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventDataRepository extends JpaRepository<EventData,Long> {

    @Query(value = "SELECT DISTINCT e.id_event, e.date_event, e.start_time, e.end_time, e.location, e.objective " +
            "FROM event_data e " +
            "JOIN attendance a ON e.id_event = a.id_event " +
            "JOIN user_course uc ON a.id_user = uc.id_user " +
            "JOIN course c ON uc.id_course = c.id_course " +
            "WHERE c.number_course =:courseNumber", nativeQuery = true)
    List<EventData> findEventsByCourseNumber(int courseNumber);
// para obtener las fechas
@Query(value = "SELECT DISTINCT ed.date_event " +
        "FROM event_data ed " +
        "JOIN attendance a ON ed.id_event = a.id_event " +
        "JOIN user_course uc ON a.id_user = uc.id_user " +
        "JOIN course c ON uc.id_course = c.id_course " +
        "WHERE c.number_course = :courseNumber",
        nativeQuery = true)
    List<Date> findEventDatesByCourseNumber(Integer courseNumber);

}
