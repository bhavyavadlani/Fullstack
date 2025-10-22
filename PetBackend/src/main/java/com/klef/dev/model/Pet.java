package com.klef.dev.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pet_table")
public class Pet 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_id")
    private int id;

    @Column(name = "pet_name", length = 200, nullable = false)
    private String name;

    @Column(name = "pet_type", length = 200, nullable = false)
    private String type;

    @Column(name = "pet_age", nullable = false)
    private int age;

    @Column(name = "pet_owner", length = 300, nullable = false)
    private String owner;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
}
