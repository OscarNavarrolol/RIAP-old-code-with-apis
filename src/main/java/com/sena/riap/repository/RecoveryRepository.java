package com.sena.riap.repository;

import com.sena.riap.entities.Recovery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecoveryRepository extends JpaRepository<Recovery,Long> {
}
