package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PetBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetBackendApplication.class, args);
        System.out.println(" Pet Backend is Running...");
    }
}
