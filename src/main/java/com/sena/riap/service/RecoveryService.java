package com.sena.riap.service;

import com.sena.riap.entities.Recovery;

import java.util.List;

public interface RecoveryService {

    public List<Recovery> getRecovery();

    public Recovery saveRecovery(Recovery recovery);

    public Recovery getRecoveryById(Long id);

    public Recovery updateRecovery(Long id,Recovery recovery);

    public void deleteRecovery (Long id);

    public Recovery saveNewKey(Long id);

}
