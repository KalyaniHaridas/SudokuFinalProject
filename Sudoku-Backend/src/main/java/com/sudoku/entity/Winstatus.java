package com.sudoku.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Winstatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer winStatId;

    private String winStat;

    private String winMin;

    private String winSec;
    @ManyToOne(fetch = FetchType.EAGER)
    private Player Player;


}
