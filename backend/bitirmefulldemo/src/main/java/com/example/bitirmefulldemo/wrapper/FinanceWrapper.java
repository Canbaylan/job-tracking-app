package com.example.bitirmefulldemo.wrapper;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinanceWrapper {
    private Integer id;
    private Integer taskId;
    private String tip;
    private String odeyen;
    private String odemeAlan;
    private String aciklama;
    private Integer tutar;
    private String odeyenTelefon;
    private LocalDateTime createDateTime;
    private boolean isDeleted;
    private Integer userId;

}
