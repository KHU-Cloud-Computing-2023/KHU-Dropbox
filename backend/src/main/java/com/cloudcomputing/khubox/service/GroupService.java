package com.cloudcomputing.khubox.service;

import com.cloudcomputing.khubox.domain.Group;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.repository.GroupRepository;
import com.cloudcomputing.khubox.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupService {


	private final MemberRepository memberRepository;
	private final GroupRepository groupRepository;


	public List<Group> getGroupsWithMember(Long memberId) {
		Member member = memberRepository.findById(memberId).orElse(null);
		if (member != null) {
			return groupRepository.findByGroupMembers(member);
		}
		return Collections.emptyList();
	}

	public Group createGroup(Group group) {
		groupRepository.save(group);
		return group;
	}

	public List<String> getMemberNamesByGroupName(String groupName) {
		Group group = groupRepository.findByName(groupName).orElse(null);
		if (group != null) {
			List<Member> members = group.getGroupMembers();
			return members.stream()
					.map(Member::getName)
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}

	public Group findGroupByGroupName(String groupName) {
		return groupRepository.findByName(groupName).orElse(null);
	}

	public Group addMember(String groupName, String memberId){
		Optional<Member> addMember = memberRepository.findByLoginId(memberId);
		Group group = groupRepository.findByName(groupName).orElse(null);

		if (addMember != null){
			if (group != null) {
				List<Member> list = group.getGroupMembers();
				list.add(addMember.get());
				group.setGroupMembers(list);
			}
		}

		groupRepository.save(group);
		return group;
	}
}