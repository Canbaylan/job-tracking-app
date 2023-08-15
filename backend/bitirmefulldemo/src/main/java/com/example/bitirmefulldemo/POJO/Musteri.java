package com.example.bitirmefulldemo.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;
import java.io.Serializable;

@NamedQuery(name="Musteri.getAllMusteri",query = "select new com.example.bitirmefulldemo.wrapper.MusteriWrapper(m.id,m.firma,m.vergiDairesi,m.il,m.ilce,m.yetkiliAdSoyad,m.yetkiliEmail,m.firmaEmail,m.adres,m.aciklama,m.yetkiliTelefon,m.firmaTelefon,m.tcknVergiNo,m.musteriKodu,m.userId,m.isDeleted) from Musteri m")

@NamedQuery(name="Musteri.getMusteri",query = "select new com.example.bitirmefulldemo.wrapper.MusteriWrapper(m.id,m.firma,m.vergiDairesi,m.il,m.ilce,m.yetkiliAdSoyad,m.yetkiliEmail,m.firmaEmail,m.adres,m.aciklama,m.yetkiliTelefon,m.firmaTelefon,m.tcknVergiNo,m.musteriKodu,m.userId,m.isDeleted) from Musteri m where m.userId=:userId and m.isDeleted=true")

@NamedQuery(name="Musteri.deleteMusteri",query="update Musteri m set m.isDeleted=false where m.id=:id")
@NamedQuery(name="Musteri.getMusteriById",query="select new com.example.bitirmefulldemo.wrapper.MusteriWrapper(m.id,m.firma,m.vergiDairesi,m.il,m.ilce,m.yetkiliAdSoyad,m.yetkiliEmail,m.firmaEmail,m.adres,m.aciklama,m.yetkiliTelefon,m.firmaTelefon,m.tcknVergiNo,m.musteriKodu,m.userId,m.isDeleted) from Musteri m where m.id=:id and m.isDeleted=true")
@NamedQuery(name="Musteri.updateMusteri",query="update Musteri m set m.aciklama=:aciklama,m.adres=:adres,m.firma=:firma,m.firmaEmail=:firmaEmail,m.firmaTelefon=:firmaTelefon,m.il=:il,m.ilce=:ilce,m.musteriKodu=:musteriKodu,m.tcknVergiNo=:tcknVergiNo,m.vergiDairesi=:vergiDairesi,m.yetkiliAdSoyad=:yetkiliAdSoyad,m.yetkiliEmail=:yetkiliEmail,m.yetkiliTelefon=:yetkiliTelefon where m.id=:id")

@Entity
@DynamicUpdate
@DynamicInsert
@Data
@Table(name="musteri")
public class Musteri implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private int userId;
    private boolean isDeleted;






}
