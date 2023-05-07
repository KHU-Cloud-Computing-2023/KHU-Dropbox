package com.cloudcomputing.khubox.service;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final MemberRepository memberRepository;

	@Autowired
	private AuthConfig authConfig;

	public Member login(String loginId, String password) {
		return memberRepository.findByLoginId(loginId)
				.filter(m -> m.getPassword().equals(password))
				.orElse(null);
	}

	public Member createMember(Member member) {
		memberRepository.save(member);
		return member;
	}
}