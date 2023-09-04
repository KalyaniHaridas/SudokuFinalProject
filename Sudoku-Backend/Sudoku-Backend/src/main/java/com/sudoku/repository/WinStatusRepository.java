package com.sudoku.repository;

import com.sudoku.entity.Feedback;
import com.sudoku.entity.Winstatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WinStatusRepository extends JpaRepository<Winstatus, Integer> {

    @Query("SELECT w FROM Winstatus w WHERE w.Player.playerId = :playerId")
    List<Winstatus> findWinstatusByPlayerId(@Param("playerId") Integer playerId);
}

