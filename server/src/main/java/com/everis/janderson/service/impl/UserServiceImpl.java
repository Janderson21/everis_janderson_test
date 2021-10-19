package com.everis.janderson.service.impl;

import java.util.Collection;
import java.util.Optional;

import com.everis.janderson.model.Booking;
import com.everis.janderson.repository.UserRepository;
import com.everis.janderson.service.IService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.everis.janderson.model.User;

@Service
public class UserServiceImpl implements IService<User> {

	@Autowired
	private UserRepository userRepository;

	@Override
	public Collection<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public Optional<User> findById(Integer id) {
		return userRepository.findById(id);
	}

	@Override
	public User saveOrUpdate(User user) {
		return userRepository.saveAndFlush(user);
	}

	@Override
	public String deleteById(Integer id) {
		JSONObject jsonObject = new JSONObject();
		try {
			userRepository.deleteById(id);
			jsonObject.put("message", "Usuário removido com sucesso.");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}