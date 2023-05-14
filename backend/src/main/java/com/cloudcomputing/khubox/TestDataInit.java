package com.cloudcomputing.khubox;


import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TestDataInit {


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    /**
     * 테스트용 데이터 추가
     */
    @PostConstruct
    public void init() {

//        Member member = new Member();
//        member.setLoginId("admin");
//        member.setPassword(passwordEncoder.encode("admin"));
//        member.setName("테스터");
//

    }

}