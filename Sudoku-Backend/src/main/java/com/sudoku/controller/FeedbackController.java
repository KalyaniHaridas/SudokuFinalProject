package com.sudoku.controller;

import com.sudoku.entity.Feedback;
import com.sudoku.repository.FeedbackRepository;
import com.sudoku.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private FeedbackRepository feedbackRepository;
    @PostMapping("/save")
    public ResponseEntity<String> saveFeedback(@RequestBody Feedback feedback) {
        String msg = feedbackService.saveFeedback(feedback);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
    @GetMapping(value = "/getfeedback", produces = "application/json")
    public ResponseEntity<List<Feedback>> getFeedback(@RequestParam("playerId") Integer playerId) {
        System.out.println("Request received for player ID: " + playerId);
        List<Feedback> list = feedbackRepository.findFeedbackByPlayerId(playerId);
        if (list != null)
            return ResponseEntity.ok().body(list);
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
