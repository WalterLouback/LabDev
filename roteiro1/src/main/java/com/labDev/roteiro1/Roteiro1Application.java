package com.labDev.roteiro1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.labDev.roteiro1.entity")
public class Roteiro1Application { 
	public static void main(String[] args) {
		SpringApplication.run(Roteiro1Application.class, args);
	}

}
