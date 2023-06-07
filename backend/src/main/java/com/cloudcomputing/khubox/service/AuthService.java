package com.cloudcomputing.khubox.service;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

	private final FileService fileService;

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

	public Member updateMember(Member updatedMember, HttpServletRequest request) {
		String loginId = (String) request.getSession().getAttribute("id");
		Member existingMember = memberRepository.findByLoginId(loginId).orElse(null);

		if (existingMember != null){
			existingMember.setEmail(updatedMember.getEmail());
			existingMember.setWork(updatedMember.getWork());
			existingMember.setEducation(updatedMember.getEducation());

			// Update the password if a new password is provided
			if (updatedMember.getPassword() != null && !updatedMember.getPassword().isEmpty()) {
				existingMember.setPassword(passwordEncoder.encode(updatedMember.getPassword()));
			}

			// Save the updated member
			memberRepository.save(existingMember);
			return existingMember;
		}

		return null; // Member not found
	}

	public Member findMemberByLoginId(String loginId) {
		return memberRepository.findByLoginId(loginId).orElse(null);
	}

}