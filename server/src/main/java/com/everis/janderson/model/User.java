package com.everis.janderson.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="USER")
public class User {

	@Id
	@GeneratedValue
	@Column(name="ID")
	private Integer id;

	@Column(name="NAME")
	private String name;

	@Column(name="EMAIL")
	private String email;

	@Column(name="PASSWORD")
	private String password;

}