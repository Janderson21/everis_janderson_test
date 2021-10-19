package com.everis.janderson.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="CAR")
public class Car {

    @Id
    @GeneratedValue
    @Column(name="ID")
    private Integer id;

    @Column(name="BRAND")
    private String brand;

    @Column(name="MODEL")
    private String model;

    @Column(name="IMAGE")
    private String image;

    @Column(name="COLOR")
    private String color;

    @Column(name="YEAR")
    private Integer year;

    @Column(name="KM")
    private Integer km;
}
