package com.sudoku.service;

import com.sudoku.entity.Player;
import com.sudoku.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;



    public String savePlayer(Player player) {
        if(player != null) {
            playerRepository.save(player);
        } else {
            throw new RuntimeException("given Player is null");
        }
        return "signup success";
    }

    public List<Player> getAllPlayer() {
        List<Player> list = playerRepository.findAll();
        if(list == null) {
            throw new RuntimeException("no Player in database");
        }
        return list;
    }

    public Player getPlayerById(Integer id) {
        Player player = new Player();
        if(id==null) {
            throw new RuntimeException("given id is not valid");
        } else {
            player = playerRepository.getById(id);
        }
        if(player==null) {
            throw new RuntimeException("Given Id is not present");
        }
        return player;
    }
    public Player getPlayerById(String gmail) {
        List<Player> player;
        if(gmail==null) {
            throw new RuntimeException("given id is not valid");
        } else {
            player = playerRepository.findByEmail(gmail);
        }
        if(player==null) {
            throw new RuntimeException("Given Player is not present");
        }
        return player.get(0);
    }

    public Player getPlayerByMailAndPassword(String email, String password) {
        List<Player> player;
        if(email==null || password ==null) {
            throw new RuntimeException("given Player details is not valid");
        } else {
            player = playerRepository.findByEmailAndPassword(email,password);
        }
        if(player.isEmpty()) {
            throw new RuntimeException("Given Player details is not present");
        }
        return player.get(0);
    }

}
