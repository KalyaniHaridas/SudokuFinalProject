package com.sudoku.controller;

import com.sudoku.entity.Feedback;
import com.sudoku.entity.Winstatus;
import com.sudoku.repository.WinStatusRepository;
import com.sudoku.service.WinStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/winstatus")
public class WinstatusController {
    @Autowired
    private WinStatusService winStatusService;

    @Autowired
    private WinStatusRepository winStatusRepository;

    @PostMapping("/save")
    public ResponseEntity<String> saveWinstat(@RequestBody Winstatus winstatus) {
        winstatus.setWinStat("WINNER");
        String msg = winStatusService.save(winstatus);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @GetMapping(value = "/getfeedback", produces = "application/json")
    public ResponseEntity<List<Winstatus>> getWinstatus(@RequestParam("playerId") Integer playerId) {
        System.out.println("Request received for player ID: " + playerId);
        List<Winstatus> list= winStatusRepository.findWinstatusByPlayerId(playerId);
        if (list != null)
            return ResponseEntity.ok().body(list);
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

}
