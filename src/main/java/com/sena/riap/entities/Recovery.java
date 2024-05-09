package com.sena.riap.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.*;

import java.time.LocalDateTime;



@Entity
@Table(name = "recovery")
public class Recovery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recovery")
    private Long idRecovery;

    @NotNull(message = "key cannot be null")
    private String key;

    @NotBlank(message = "Expiration date cannot be null")
    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @NotNull(message = "idUser cannot be null")
    @Column(name = "id_user")
    private Long idUser;

    public Long getIdRecovery() {
        return idRecovery;
    }

    public void setIdRecovery(Long idRecovery) {
        this.idRecovery = idRecovery;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }
}
