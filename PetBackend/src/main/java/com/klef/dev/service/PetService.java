package com.klef.dev.service;

import java.util.List;
import com.klef.dev.model.Pet;

public interface PetService
{
    public String addPet(Pet pet);
    public String deletePet(int pid);
    public List<Pet> viewAllPets();
    public String updatePet(Pet pet);
    public Pet getPetById(int pid);
}
