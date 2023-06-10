package com.cloudcomputing.khubox.controller;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.AdminUserGlobalSignOutRequest;
import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.LoginForm;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.service.AuthService;
import com.cloudcomputing.khubox.service.FileService;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.nimbusds.oauth2.sdk.AuthorizationCode;
import com.nimbusds.oauth2.sdk.TokenResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.Base64;

@Slf4j
@CrossOrigin("*")
@RequestMapping("/auth")
@Controller
@RequiredArgsConstructor
public class AuthController {


	private final AuthService authService;
	private final FileService fileService;

	@GetMapping("/signup")
	public String signupForm() {
		return "auth/signup";
	}

	@GetMapping("/login")
	public String loginForm() {
		return "auth/login";
	}

	@PostMapping("/signup")
	public String signup(@RequestBody Member member) {

		fileService.makeBucketDirectory(member.getLoginId());
		authService.createMember(member);

		log.info("signup, member={}", member);
		return "redirect:http://localhost:3000/auth/login";
	}


	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginForm login, HttpServletRequest request) {
		Member loginMember = authService.login(login.getLoginId(), login.getPassword());

		log.info("login, member={}", loginMember);

		if (loginMember == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login credentials");
		}

		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(loginMember, null, null));
		request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

		request.getSession().setAttribute("id", loginMember.getLoginId());

		return ResponseEntity.ok("Login successful");
	}


	@GetMapping("/updateuser")
	@ResponseBody
	public ResponseEntity<?> showUpdateForm(HttpServletRequest request) {
		// Get the login ID from the authenticated user
		String loginId = (String) request.getSession().getAttribute("id");

		// Find the existing member based on the login ID
		Member existingMember = authService.findMemberByLoginId(loginId);

		if (existingMember == null) {
			// Handle the case where the member does not exist
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Member not found");
		}

		// Return the existing member as JSON response
		return ResponseEntity.ok(existingMember);
	}


	@PostMapping("/updateuser")
	public ResponseEntity<?> update(@RequestBody Member member, HttpServletRequest request) {

		Member updatedMember = authService.updateMember(member, request);

		log.info("update, member={}", updatedMember);

		if (updatedMember == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to update member");
		}

		return ResponseEntity.ok(updatedMember);
	}

}