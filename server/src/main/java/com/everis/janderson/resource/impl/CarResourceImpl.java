package com.everis.janderson.resource.impl;

import com.everis.janderson.model.Car;
import com.everis.janderson.resource.Resource;
import com.everis.janderson.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/car")
@CrossOrigin(origins="http://localhost:3000")
public class CarResourceImpl implements Resource<Car> {
	
	@Autowired
	private IService<Car> carService;

	@Override
	public ResponseEntity<Car> findAll() {
		return new ResponseEntity(carService.findAll(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Car> findById(Integer id) {
		Car car = carService.findById(id).get();
		return new ResponseEntity(car, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Car> save(Car car) {
		return new ResponseEntity<>(carService.saveOrUpdate(car), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Car> update(Car car) {
		return new ResponseEntity<>(carService.saveOrUpdate(car), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Integer id) {
		return new ResponseEntity<>(carService.deleteById(id), HttpStatus.OK);
	}
}
