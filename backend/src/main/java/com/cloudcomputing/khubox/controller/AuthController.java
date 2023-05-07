package com.cloudcomputing.khubox.controller;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.LoginForm;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequestMapping("/auth")
@Controller
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@Autowired
	AuthConfig authConfig;

	@GetMapping("/signup")
	public String signupForm() {
		return "auth/signup";
	}

	@PostMapping("/signup")
	public String signup(@ModelAttribute Member member) {
		authService.createMember(member);
		log.info("signup, member={}", member);
		return "redirect:/auth/login";
	}

	@GetMapping("/login")
	public String loginForm() {
		return "auth/login";
	}

	@PostMapping("login")
	public String login(@ModelAttribute LoginForm login, HttpServletResponse response) {
//		log.info(authConfig.passwordEncoder().encode(login.getPassword()));

		Member loginMember = authService.login(login.getLoginId(), login.getPassword());

		log.info("login, member={}", loginMember);

		if (loginMember == null) {
			return "auth/login";
		}

		Cookie idcookie = new Cookie("memberId", String.valueOf(loginMember.getId()));
		response.addCookie(idcookie);

		return "redirect:/";
	}
}