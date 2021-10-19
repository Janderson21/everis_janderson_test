package com.everis.janderson.service.impl;

import com.everis.janderson.model.Booking;
import com.everis.janderson.model.Car;
import com.everis.janderson.repository.CarRepository;
import com.everis.janderson.service.IService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements IService<Car> {

	@Autowired
	private CarRepository carRepository;
	
	@Override
	public List<Car> findAll() {
		return carRepository.findAll();
	}
	
	@Override
	public Optional<Car> findById(Integer id) {
		return carRepository.findById(id);
	}

	@Override
	public Car saveOrUpdate(Car car) {
		return carRepository.save(car);
	}

	@Override
	public String deleteById(Integer id) {
		JSONObject jsonObject = new JSONObject();
		try {
			carRepository.deleteById(id);
			jsonObject.put("message", "Carro removido com sucesso.");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
