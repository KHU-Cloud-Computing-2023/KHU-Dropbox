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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/auth")
@Controller
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@Autowired
	AuthConfig authConfig;


//	@Value("${spring.cognito.login}")
//	private String CognitoLogin;
//
//	@Value("${spring.cognito.logout}")
//	private String CognitoLogout;
//
//	@Value("${spring.cognito.signup}")
//	private String CognitoSignup;
//
//	@Value("${spring.security.oauth2.client.registration.cognito.poolId}")
//	private String PoolId;

//	@GetMapping("/cog_signup")
//	public String signupCog() {
//		return "redirect:" + CognitoSignup;
//	}

	@GetMapping("/signup")
	public String signupForm() {
		return "auth/signup";
	}

//	@GetMapping("/cog_login")
//	public String loginCog() {
//		return "redirect:" + CognitoLogin;
//	}

	@GetMapping("/callback")
	public String callback(@RequestParam("code") String code, HttpServletRequest request) {
		log.info("code={}", code);
		return "redirect:/";

//		try {
//			String clientId = "5uh65d8614tbflrqlqq0r36kb6"; // Cognito User Pool App 클라이언트 ID
//			String redirectUri = "http://localhost:8080/"; // Cognito User Pool App 리다이렉트 URI
//
//			String requestBody = "grant_type=authorization_code"
//					+ "&client_id=" + clientId
//					+ "&redirect_uri=" + redirectUri
//					+ "&code=" + code;
//
//			URL url = new URL("https://khubox.auth.us-east-1.amazoncognito.com/oauth2/token");
//
//			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//			connection.setRequestMethod("POST");
//			connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//			connection.setDoOutput(true);
//
//			OutputStream os = connection.getOutputStream();
//			os.write(requestBody.getBytes());
//			os.flush();
//			os.close();
//
//			int responseCode = connection.getResponseCode();
//			String b = connection.getResponseMessage();
//			log.info("mes = {}", b);
//
//			if (responseCode == HttpURLConnection.HTTP_OK) {
//				InputStream is = connection.getInputStream();
//				BufferedReader in = new BufferedReader(new InputStreamReader(is));
//
//				String inputLine;
//				StringBuffer response = new StringBuffer();
//
//				while ((inputLine = in.readLine()) != null) {
//					response.append(inputLine);
//				}
//
//				in.close();
//
//				String responseBody = response.toString();
//				JSONObject json = new JSONObject(responseBody);
//				String accessToken = json.getString("access_token");
//				String idToken = json.getString("id_token");
//
//				log.info("json={}", json);
//				// 토큰을 이용하여 로그인 처리 로직 수행
//
//				return "redirect:/";
//			} else {
//				// 오류 처리 로직
//				return "redirect:/error";
//			}
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "redirect:/error";
//		}
	}



	@GetMapping("/login")
	public String loginForm() {
		return "auth/login";
	}

//	@GetMapping("/cog_logout")
//	public String logout(HttpServletRequest request) {
//		HttpSession session = request.getSession(false);
//
//		if (session != null) {
//			session.invalidate();
//		}
//		SecurityContextHolder.clearContext();
//		return "redirect:/" + CognitoLogout;
//	}

	@PostMapping("/signup")
	public String signup(@ModelAttribute Member member) {
		authService.createMember(member);
		log.info("signup, member={}", member);
		return "redirect:/auth/login";
	}

	@PostMapping("/login")
	public String login(@ModelAttribute LoginForm login, HttpServletRequest request) {

		Member loginMember = authService.login(login.getLoginId(), login.getPassword());

		log.info("login, member={}", loginMember);

		if (loginMember == null) {
			return "auth/login";
		}

		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(loginMember, null, null));
		request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

		request.getSession().setAttribute("id", loginMember.getLoginId());

		return "redirect:/files/file";
	}

}