package com.sudoku.repository;

import com.sudoku.entity.Player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
    public List<Player> findByEmail(String email);

    public List<Player> findByEmailAndPassword(String email, String password);
}
