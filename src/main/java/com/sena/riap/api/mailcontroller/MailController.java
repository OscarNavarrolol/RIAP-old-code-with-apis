package com.sena.riap.api.mailcontroller;

import com.sena.riap.domain.EmailDTO;
import com.sena.riap.entities.Recovery;
import com.sena.riap.entities.UserData;
import com.sena.riap.service.RecoveryService;
import com.sena.riap.service.UserDataService;
import com.sena.riap.service.mailservice.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private IEmailService emailService;

    @Autowired
    private UserDataService userDataService;

    @Autowired
    private RecoveryService recoveryService;

    // metodo general para enviar un mensaje a una o mas personas
    @PostMapping("/send_message")
    public ResponseEntity<?> receiveRequestEmail(@RequestBody EmailDTO emailDTO){

        System.out.println("Message received " + emailDTO);

        emailService.sendEmail(emailDTO.getToUser(), emailDTO.getSubject(), emailDTO.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("status", "SEND");

        return ResponseEntity.ok(response);
    }

    // metodo para saber si recupera clave o envia para aprendices ******************

    //         KEY LA GENERAN CON JS Y LA PROPORCIONAN A LA REQUEST
    @PostMapping("/recovery")
    public ResponseEntity recoverPassword(@RequestParam("email") String email, @RequestParam("key") String key){
        UserData user = userDataService.findByEmail(email);
        if (user.getRoleUser().equals("admin") && user != null){
            emailService.sendEmailRecover(email,key);
            recoveryService.saveNewKey(user.getIdUser(),key);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // ingresa la key que le llega al usuario y retorna el ID que se utiliza para actualizar su password, esta en userData
    @GetMapping("/verify")
    public Long verifyPassword(@RequestParam("key") String key){
        Recovery recovery = recoveryService.findByKey(key);
        LocalDateTime recoveryExp = recovery.getExpirationDate();
        if (LocalDateTime.now().isBefore(recoveryExp)){
            UserData userChange = userDataService.findByRecoverKey(recovery.getRecoveryKey());
            return userChange.getIdUser();
        }
        return null;
    }
    // Compara el valor proporcionado con el generado anteriormente y retorna el id del usuario
    // crear una interfaz para que el usuario coloque la nueva contraseña.
}
