package com.everis.janderson.service.impl;

import java.util.List;
import java.util.Optional;

import com.everis.janderson.repository.BookingRepository;
import com.everis.janderson.service.IService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.everis.janderson.model.Booking;

@Service
public class BookingServiceImpl implements IService<Booking> {

	@Autowired
	private BookingRepository bookingRepository;

	@Override
	public List<Booking> findAll() {
		return bookingRepository.findAll();
	}

	@Override
	public Optional<Booking> findById(Integer id) {
		return bookingRepository.findById(id);
	}

	@Override
	public Booking saveOrUpdate(Booking booking) {
		return bookingRepository.save(booking);
	}

	@Override
	public String deleteById(Integer id) {
		JSONObject jsonObject = new JSONObject();
		try {
			bookingRepository.deleteById(id);
			jsonObject.put("message", "Reserva removida com sucesso.");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
