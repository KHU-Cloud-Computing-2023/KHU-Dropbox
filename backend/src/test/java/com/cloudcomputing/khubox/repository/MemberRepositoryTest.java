package com.cloudcomputing.khubox.repository;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.service.AuthService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MemberRepositoryTest {

	MemberRepository memberRepository = new MemberRepository();
	AuthService authService = new AuthService(memberRepository);

	@Autowired
	AuthConfig authConfig;

	@Test
	public void login() {
		Member member = new Member();
		member.setLoginId("admin");
		member.setPassword(authConfig.passwordEncoder().encode("1234"));
		memberRepository.save(member);

		Member loginMember = authService.login(member.getLoginId(), member.getPassword());

		Assertions.assertThat(loginMember).isEqualTo(member);
	}
}