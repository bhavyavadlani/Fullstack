package com.klef.dev.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.model.Pet;
import com.klef.dev.service.PetService;

@RestController
@RequestMapping("/petapi")
@CrossOrigin("*")
public class PetController
{
    @Autowired
    private PetService petService;

    @GetMapping("/")
    public String home() {
        return "Welcome to Pet Backend API";
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPet(@RequestBody Pet pet)
    {
        try {
            String result = petService.addPet(pet);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Add Pet");
        }
    }

    @DeleteMapping("/delete/{pid}")
    public ResponseEntity<String> deletePet(@PathVariable int pid)
    {
        try {
            String result = petService.deletePet(pid);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Delete Pet");
        }
    }

    @GetMapping("/viewall")
    public ResponseEntity<List<Pet>> viewAllPets()
    {
        List<Pet> pets = petService.viewAllPets();
        return ResponseEntity.ok(pets);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updatePet(@RequestBody Pet pet)
    {
        try {
            String result = petService.updatePet(pet);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Update Pet");
        }
    }

    @GetMapping("/viewbyid/{pid}")
    public ResponseEntity<?> getPetById(@PathVariable int pid)
    {
        try {
            Pet pet = petService.getPetById(pid);
            if (pet != null)
                return ResponseEntity.ok(pet);
            else
                return ResponseEntity.status(404).body("Pet Not Found");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Fetch Pet");
        }
    }
}
