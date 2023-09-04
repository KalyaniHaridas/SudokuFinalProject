package com.sudoku.repository;

import com.sudoku.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback , Integer> {
    @Query("SELECT f FROM Feedback f WHERE f.player.playerId = :playerId")
    List<Feedback> findFeedbackByPlayerId(@Param("playerId") Integer playerId);
}
