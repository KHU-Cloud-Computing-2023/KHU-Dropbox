package com.tutorial.springboard.repository;

import com.tutorial.springboard.domain.Board;
import com.tutorial.springboard.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Board findByUser(User user);
}