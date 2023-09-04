package com.sudoku.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@ToString
@Entity
@Table(name = "Player")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Player {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer playerId;
    private String firstName;
    private String lastName;

    private String email;
    private String phoneNo;

    private String password;


}
