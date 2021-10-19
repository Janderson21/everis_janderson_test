package com.everis.janderson;

import com.everis.janderson.model.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.everis.janderson.service.IService;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Autowired
	private IService<Car> carService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(carService.findAll().size() == 0) {
			Car firstCar = new Car();
			firstCar.setModel("720S");
			firstCar.setBrand("McLaren");
			firstCar.setColor("Laranja");
			firstCar.setKm(2000);
			firstCar.setYear(2018);
			firstCar.setImage("https://fotos.socarrao.com.br/1028427/4492037/4492037F_1633727196_17_880.jpg");
			this.carService.saveOrUpdate(firstCar);
			Car secondCar = new Car();
			secondCar.setModel("HURACAN");
			secondCar.setBrand("Lamborghini");
			secondCar.setColor("Branca");
			secondCar.setKm(1400);
			secondCar.setYear(2019);
			secondCar.setImage("https://fotos.socarrao.com.br/1028427/4441698/4441698F_1633706224_5_400.jpg");
			this.carService.saveOrUpdate(secondCar);
			Car thirdCar = new Car();
			thirdCar.setModel("ESCALADE");
			thirdCar.setBrand("Cadillac");
			thirdCar.setColor("Preta");
			thirdCar.setKm(0);
			thirdCar.setYear(2021);
			thirdCar.setImage("https://fotos.socarrao.com.br/845143/4496604/4496604F_1632862764_99_150.jpg");
			this.carService.saveOrUpdate(thirdCar);
		}
	}

}
