package com.sena.riap.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "course")
public class Course {

    @Id
    @Column(name = "id_course")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCourse;

    @NotNull(message = "Number cannot be null")
    @Column(name = "number_course")
    private Integer number;

    @Column(name = "id_program")
    private Long idProgram;

    public Long getIdCourse() {
        return idCourse;
    }

    public void setIdCourse(Long idCourse) {
        this.idCourse = idCourse;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Long getIdProgram() {
        return idProgram;
    }

    public void setIdProgram(Long idProgram) {
        this.idProgram = idProgram;
    }
}
