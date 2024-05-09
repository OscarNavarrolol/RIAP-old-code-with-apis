package com.sena.riap.api.mailcontroller;

import com.sena.riap.domain.EmailDTO;
import com.sena.riap.entities.UserData;
import com.sena.riap.service.mailservice.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private IEmailService emailService;

    @PostMapping("/send_message")
    public ResponseEntity<?> receiveRequestEmail(@RequestBody EmailDTO emailDTO){

        System.out.println("Message received " + emailDTO);

        emailService.sendEmail(emailDTO.getToUser(), emailDTO.getSubject(), emailDTO.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("status", "SEND");

        return ResponseEntity.ok(response);
    }

    // working,          KEY LA GENERAN CON JS Y LA PROPORCIONAN A LA REQUEST
    @PostMapping("/recovery")
    public ResponseEntity<?> recoverPassword(@RequestParam("email") String email, @RequestParam("key") String key){
        // debo verificar q el correo sea de un instructor y no de un aprendiz para hacer el envio, revisar y moficar metodos
        // en la nueva tabla guardar el id del usuario, el id generado, debe ser uno a uno la tabla, tiempo limite,
        // cada q se genere una clave de recuperacion borra la anterior
        emailService.sendEmailRecover(email,key);

        Map<String, String> response = new HashMap<>();
        response.put("status", "SEND");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    public Boolean verifyPassword(@RequestParam("key") String key){
        // metodo para tomar el valor proporcionado y compararlo con el generado en el metodo anterior, al retornar el valor se decide
        // si se crea una interfaz para q el coloque la nueva contraseña.
        return null;
    }
}
