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

    // working
    @PostMapping("/recovery")
    public ResponseEntity<?> recoverPassword(@RequestParam("email") String email, @RequestParam("key") String key){
        emailService.sendEmailRecover(email,key);

        Map<String, String> response = new HashMap<>();
        response.put("status", "SEND");
        return ResponseEntity.ok(response);
    }

}
