package com.everis.janderson.resource.impl;

import com.everis.janderson.model.Booking;
import com.everis.janderson.model.Car;
import com.everis.janderson.model.User;
import com.everis.janderson.repository.BookingRepository;
import com.everis.janderson.resource.Resource;
import com.everis.janderson.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins="http://localhost:3000")
public class BookingResourceImpl implements Resource<Booking> {

	@Autowired
	private IService<Booking> bookingService;
	@Autowired
	private IService<User> userService;
	@Autowired
	private IService<Car> carService;
	@Autowired
	private BookingRepository bookingRepository;

	@Override
	public ResponseEntity<Booking> findAll() {
		return new ResponseEntity(bookingService.findAll(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Booking> findById(Integer id) {
		Booking booking = bookingService.findById(id).get();
		return new ResponseEntity(booking, HttpStatus.OK);
	}

	@Override
	public ResponseEntity save(Booking booking) {
		try {
			Date current_date = new Date();
			if(booking.getDtfim().before(current_date))
				throw new Exception("Data final menor que data atual.");
			if(booking.getDtfim().before(booking.getDtini()))
				throw new Exception("Data final menor que data inicial.");
			if(booking.getDtini().before(current_date))
				throw new Exception("Reserva deve ser realizada com um dia de antecedência.");
			User user = userService.findById(booking.getUser_id()).get();
			Booking bookingUser = bookingRepository.getBookingByUser(user.getId());
			if(bookingUser != null)
				throw new Exception("Você já tem uma reserva");
			Car car = carService.findById(booking.getCar_id()).get();
			booking.setCar(car);
			booking.setUser(user);
			return new ResponseEntity<>(bookingService.saveOrUpdate(booking), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<Booking> update(Booking booking) {
		return new ResponseEntity<>(bookingService.saveOrUpdate(booking), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Integer id) {
		return new ResponseEntity<>(bookingService.deleteById(id), HttpStatus.OK);
	}
}
