package com.cloudcomputing.khubox;


import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TestDataInit {

    private final MemberRepository memberRepository;
    private static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * 테스트용 데이터 추가
     */
    @PostConstruct
    public void init() {

        Member member = new Member();
        member.setLoginId("admin");
        member.setPassword(passwordEncoder.encode("admin"));
        member.setName("테스터");

        memberRepository.save(member);

    }

}