package com.everis.janderson.model;

import jdk.nashorn.internal.ir.annotations.Ignore;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "BOOKING")
public class Booking {

	@Id
	@GeneratedValue
	@Column(name="ID")
	private Integer id;

	@Column(name="DTINI")
	private Date dtini;

	@Column(name="DTFIM")
	private Date dtfim;

	@OneToOne
	@JoinColumn(name = "USER", referencedColumnName = "ID")
	private User user;

	@OneToOne
	@JoinColumn(name = "CAR", referencedColumnName = "ID")
	private Car car;

	@Ignore
	public Integer user_id;
	@Ignore
	public Integer car_id;
}
