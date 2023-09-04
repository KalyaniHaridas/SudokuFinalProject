package com.sudoku.controller;

import com.sudoku.entity.Player;
import com.sudoku.mail.JavaMailSenderAPI;
import com.sudoku.repository.PlayerRepository;
import com.sudoku.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/Player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private JavaMailSenderAPI javaMailSenderAPI;
    @PostMapping(value="/signup", consumes={"application/json"})
    public ResponseEntity<String> signup(@RequestBody Player player) {
        String msg = playerService.savePlayer(player);
        String mail = player.getEmail();
        javaMailSenderAPI.sendMail(mail,
                "sign up successfull to sudoku application",
                "your sign up success full to our application" +
                        "to get services login to our official web site and enjoy your game ");
        return new ResponseEntity<>(msg, HttpStatus.CREATED);
    }

    @GetMapping(value="/signin", produces = {"application/json"})
    public ResponseEntity<Player> signin(@RequestParam("email") String email, @RequestParam("password") String password) {
        Player player = playerService.getPlayerByMailAndPassword(email, password);
        return new ResponseEntity<>(player,HttpStatus.ACCEPTED);
    }

    @GetMapping(value="/getall", produces = {"application/json"})
    public ResponseEntity<List<Player>> getAll(){
        List<Player> list=playerService.getAllPlayer();
        //  System.out.println(list);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/getbyid")
    public ResponseEntity<Player> getById(@RequestParam("playerId") Integer playerId){
        Player player=playerService.getPlayerById(playerId);
        //  System.out.println(list);
        return new ResponseEntity<>(player,HttpStatus.OK);
    }

    @PostMapping(value="/update",consumes = {"application/json"},produces = {"application/json"})
    public ResponseEntity<String> updateById(@RequestBody Player player){
        Integer playerId = player.getPlayerId();
        if(playerId!=null) {
            Player player1 = playerRepository.getReferenceById(playerId);
            player1.setFirstName(player.getFirstName());
            player1.setLastName(player.getLastName());
            player1.setEmail(player.getEmail());
            player1.setPassword(player.getPassword());
            player1.setPhoneNo(player.getPhoneNo());
            playerRepository.save(player1);
            return new ResponseEntity<>("updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("not updated",HttpStatus.OK);
        }
    }

    @GetMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam("playerId") Integer PlayerId){
        playerRepository.deleteById(PlayerId);
        return new ResponseEntity<>("player deleted",HttpStatus.OK);
    }

}
