package com.cloudcomputing.khubox.repository;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.*;

@Slf4j
@Repository
public class MemberRepository {

	private static Map<Long, Member> store = new HashMap<>();
	private static long sequence = 0L;

	@Autowired
	private AuthConfig authConfig;

	public Member save(Member member) {
		member.setId(++sequence);
//		member.setPassword(authConfig.passwordEncoder().encode(member.getPassword()));
		log.info("save: member={}", member);
		store.put(member.getId(), member);
		return member;
	}

	public Member findById(Long id) {
		return store.get(id);
	}

	public Optional<Member> findByLoginId(String loginId) {
		return findAll().stream()
				.filter(m -> m.getLoginId().equals(loginId))
				.findFirst();
	}

	public List<Member> findAll() {
		return new ArrayList<>(store.values());
	}

	public void clearStore() {
		store.clear();
	}
}