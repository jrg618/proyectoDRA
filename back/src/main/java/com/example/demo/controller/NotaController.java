package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Nota;
import com.example.demo.repository.NotaRepository;

@RestController
@RequestMapping("/notas")
public class NotaController {
    private final NotaRepository notaRepository;

    public NotaController(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    @GetMapping
    public ResponseEntity<List<Nota>> getAllNotas() {
        List<Nota> notas = (List<Nota>) notaRepository.findAll();
        return new ResponseEntity<>(notas, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Nota> addNota(@RequestBody Nota nota) {
        Nota savedNota = notaRepository.save(nota);
        return new ResponseEntity<>(savedNota, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Nota>> getnotasByMensaje(@RequestParam("mensaje") String mensaje) {
        List<Nota> notas = notaRepository.findByMensajesNameContainingIgnoreCase(mensaje);
        return new ResponseEntity<>(notas, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> updateNota(@PathVariable("id") long id, @RequestBody Nota updatedNota) {
        Optional<Nota> optionalNota = notaRepository.findById(id);

        if (optionalNota.isPresent()) {
            Nota hero = optionalNota.get();
            hero.setName(updatedNota.getName());
            hero.setMensajes(updatedNota.getMensajes());

            Nota savedNota = notaRepository.save(hero);
            return new ResponseEntity<>(savedNota, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> getNotaById(@PathVariable("id") long id) {
        Optional<Nota> optionalNota = notaRepository.findById(id);

        if (optionalNota.isPresent()) {
            Nota nota = optionalNota.get();
            return new ResponseEntity<>(nota, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable("id") long id) {
        notaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}