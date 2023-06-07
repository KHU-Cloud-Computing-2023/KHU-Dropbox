package com.cloudcomputing.khubox.repository;

import com.cloudcomputing.khubox.domain.Group;
import com.cloudcomputing.khubox.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
	Optional<Group> findByName(String loginId);
	List<Group> findByGroupMembers(Member member);
}