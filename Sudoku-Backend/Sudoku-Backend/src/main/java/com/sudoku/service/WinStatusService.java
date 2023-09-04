package com.sudoku.service;

import com.sudoku.entity.Player;
import com.sudoku.entity.Winstatus;
import com.sudoku.repository.PlayerRepository;
import com.sudoku.repository.WinStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WinStatusService {

    @Autowired
    private WinStatusRepository winStatusRepository;

    @Autowired
    private PlayerRepository playerRepository;
    public String save(Winstatus winstatus) {
        if(winstatus != null) {
            winStatusRepository.save(winstatus);
            return "entry submitted successfull";
        } else {
            return "entry is not submiited";
        }
    }


}
