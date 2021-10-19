package com.everis.janderson.resource.impl;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.janderson.config.JwtTokenProvider;
import com.everis.janderson.model.User;
import com.everis.janderson.repository.UserRepository;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResourceImpl {

	private static Logger log = LoggerFactory.getLogger(UserResourceImpl.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> register(@RequestBody User user) {
		JSONObject jsonObject = new JSONObject();
		try {
			user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
			User savedUser = userRepository.saveAndFlush(user);
			jsonObject.put("message", savedUser.getName() + " registrado com sucesso.");
			return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
		} catch (JSONException e) {
			try {
				jsonObject.put("exception", e.getMessage());
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
		}
		}

		@PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<String> authenticate(@RequestBody User user) throws JSONException {
			JSONObject jsonObject = new JSONObject();
			try {
				BCryptPasswordEncoder b = new BCryptPasswordEncoder();
				User userLogged = userRepository.findByEmail(user.getEmail());
				if(!b.matches(user.getPassword(), userLogged.getPassword()))
					throw new Exception("Usuário não encontrado.");
				Authentication authentication = authenticationManager
						.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
				if (authentication.isAuthenticated()) {
					String email = user.getEmail();
					jsonObject.put("id", userLogged.getId());
					jsonObject.put("name", authentication.getName());
					jsonObject.put("username", userLogged.getName());
					jsonObject.put("authorities", authentication.getAuthorities());
					jsonObject.put("token", tokenProvider.createToken(email));
					return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
				}
			} catch (JSONException e) {
				try {
					jsonObject.put("exception", e.getMessage());
				} catch (JSONException e1) {
					e1.printStackTrace();
				}
				return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
			} catch (Exception e) {
				jsonObject.put("exception", e.getMessage());
				return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
			}
			return null;
		}
}