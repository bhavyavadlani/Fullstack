package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.dev.model.Pet;
import com.klef.dev.repository.PetRepository;

@Service
public class PetServiceImpl implements PetService
{
    @Autowired
    private PetRepository petRepository;

    @Override
    public String addPet(Pet pet)
    {
        petRepository.save(pet);
        return "Pet Added Successfully";
    }

    @Override
    public String deletePet(int pid)
    {
        Optional<Pet> pet = petRepository.findById(pid);
        if (pet.isPresent()) {
            petRepository.deleteById(pid);
            return "Pet Deleted Successfully";
        } else {
            return "Pet ID Not Found";
        }
    }

    @Override
    public List<Pet> viewAllPets()
    {
        return petRepository.findAll();
    }

    @Override
    public String updatePet(Pet pet)
    {
        petRepository.save(pet);
        return "Pet Updated Successfully";
    }

    @Override
    public Pet getPetById(int pid)
    {
        return petRepository.findById(pid).orElse(null);
    }
}
