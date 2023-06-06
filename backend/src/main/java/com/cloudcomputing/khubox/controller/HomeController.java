package com.cloudcomputing.khubox.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@Controller
public class HomeController {

	@GetMapping("/")
	public String home() {
		return "home";
	}
}