package com.sudoku.service;

import com.sudoku.entity.Feedback;

import com.sudoku.repository.FeedbackRepository;
import com.sudoku.repository.PlayerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private PlayerRepository playerRepository;

    public String saveFeedback(Feedback feedback) {
        if(feedback !=null){
            feedbackRepository.save(feedback);
            return "entry succesfully submitted";
        }
        else
            return "error created";
    }


}
