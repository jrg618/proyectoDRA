package com.example.demo.repository;

import com.example.demo.entity.Nota;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface NotaRepository extends CrudRepository<Nota, Long> {
    List<Nota> findByMensajesNameContainingIgnoreCase(String mensaje);

}