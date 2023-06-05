package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomController {

    @GetMapping("/holamundo")
    public ResponseEntity<String> sayHello() {
        String message = "Hola Mundo!";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
