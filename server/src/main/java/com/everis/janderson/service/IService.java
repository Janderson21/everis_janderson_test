package com.everis.janderson.service;

import com.everis.janderson.model.Booking;

import java.util.Collection;
import java.util.Optional;

public interface IService<T> {
	Collection<T> findAll();

	Optional<T> findById(Integer id);
	
	T saveOrUpdate(T t);
	
	String deleteById(Integer id);
}
