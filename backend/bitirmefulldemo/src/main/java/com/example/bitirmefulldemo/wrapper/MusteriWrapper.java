package com.example.bitirmefulldemo.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MusteriWrapper {
    private Integer id;

    private String firma;
    private String vergiDairesi;
    private String il;
    private String ilce;
    private String yetkiliAdSoyad;
    private String yetkiliEmail;
    private String firmaEmail;
    private String adres;
    private String aciklama;
    private String yetkiliTelefon;
    private String firmaTelefon;
    private String tcknVergiNo;
    private String musteriKodu;
    private Integer userId;
    private boolean isDeleted;

}
