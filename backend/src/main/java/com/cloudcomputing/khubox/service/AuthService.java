package com.cloudcomputing.khubox.service;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

	private final MemberRepository memberRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public Member login(String loginId, String password) {
		log.info("password={}", password);
		log.info("crypto={}", passwordEncoder.encode(password));
		return memberRepository.findByLoginId(loginId)
				.filter(m -> passwordEncoder.matches(password, m.getPassword()))
				.orElse(null);
	}

	public Member createMember(Member member) {
		member.setPassword(passwordEncoder.encode(member.getPassword()));
		memberRepository.save(member);
		return member;
	}
}