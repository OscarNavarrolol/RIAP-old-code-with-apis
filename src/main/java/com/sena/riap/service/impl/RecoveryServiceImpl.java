package com.sena.riap.service.impl;

import com.sena.riap.entities.Program;
import com.sena.riap.entities.Recovery;
import com.sena.riap.repository.RecoveryRepository;
import com.sena.riap.service.RecoveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecoveryServiceImpl implements RecoveryService {

    @Autowired
    private RecoveryRepository recoveryRepository;

    @Override
    public List<Recovery> getRecovery() {
        return recoveryRepository.findAll();
    }

    @Override
    public Recovery saveRecovery(Recovery recovery) {
        return recoveryRepository.save(recovery);
    }

    @Override
    public Recovery getRecoveryById(Long id) {
        return recoveryRepository.findById(id).orElse(null);
    }

    @Override
    public Recovery updateRecovery(Long id, Recovery recovery) {
        Recovery oldRecovery = recoveryRepository.findById(id).orElse(null);
        if (oldRecovery != null){
            oldRecovery.setIdUser(recovery.getIdUser());
            oldRecovery.setRecoveryKey(recovery.getRecoveryKey());
            oldRecovery.setExpirationDate(recovery.getExpirationDate());
            return recoveryRepository.save(oldRecovery);
        }
        return null;
    }

    @Override
    public void deleteRecovery(Long id) {
        recoveryRepository.deleteById(id);
    }

    // FUNTIONS FOR PROYECT

    // para guardar la key que se crea al enviar el correo. falta verificar q esa no exista, en caso contrario eliminarla (piensela).
    // y usar la validacion de tiempo limite
    @Override
    public Recovery saveNewKey(Long idUser,String key) {
        Recovery newRecovery = new Recovery();
        newRecovery.setIdUser(idUser);
        newRecovery.setRecoveryKey(key);
        newRecovery.setExpirationDate(LocalDateTime.now().plusMinutes(15));
        return recoveryRepository.save(newRecovery);
    }

    @Override
    public Recovery findByKey(String recoveryKey) {
        return recoveryRepository.findByRecoveryKey(recoveryKey);
    }

    // cocinar para revisar fehca
    public Boolean checkKeyExp(){
        return false;
    }
}
