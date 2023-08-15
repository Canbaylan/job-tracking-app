package com.example.bitirmefulldemo.wrapper;

import com.example.bitirmefulldemo.POJO.Finance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskWrapper {
    private Integer id;

    private String isIcerigi;
    private String siparisTarihi;
    private String en;
    private String boy;
    private String adet;
    private String birimFiyat;
    private String tutar;
    private String durum;
    private String firma;
    private boolean isTask;
    private boolean isDeleted;
    private boolean isCompleted;
    private Integer userId;
    private Integer musteriId;


}
