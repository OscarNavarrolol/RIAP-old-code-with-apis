package com.sena.riap.api;

import com.sena.riap.entities.Recovery;
import com.sena.riap.service.RecoveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api_recovery")
public class RecoveryRestController {

    @Autowired
    private RecoveryService recoveryService;

    @GetMapping("/list_recovery")
    public List<Recovery> listRecovery() {
        return recoveryService.getRecovery();
    }

    @GetMapping("/find/{id_recovery}")
    public Recovery getRecovery(@PathVariable("id_recovery") Long idRecovery) {
        return recoveryService.getRecoveryById(idRecovery);
    }

    @PostMapping("/save")
    public Recovery saveRecovery(@RequestBody Recovery recovery) {
        return recoveryService.saveRecovery(recovery);
    }

    @PutMapping("/update/{id_recovery}")
    public Recovery updateProgram(@PathVariable("id_recovery") Long idRecovery, @RequestBody Recovery recovery) {
        return recoveryService.updateRecovery(idRecovery, recovery);
    }

    @DeleteMapping("/delete/{id_recovery}")
    public void deleteRecovery(@PathVariable("id_recovery") Long idRecovery) {
        recoveryService.deleteRecovery(idRecovery);
    }

}
