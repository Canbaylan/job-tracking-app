package com.example.bitirmefulldemo.Dao;

import com.example.bitirmefulldemo.POJO.Musteri;
import com.example.bitirmefulldemo.wrapper.MusteriWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface MusteriDao extends JpaRepository<Musteri,Integer> {
    List<MusteriWrapper> getAllMusteri();
    List<MusteriWrapper> getMusteri(@Param("userId") int id);
    MusteriWrapper getMusteriById(@Param("id") int id);
    @Transactional
    @Modifying
    Integer deleteMusteri(@Param("id") int id);
    @Transactional
    @Modifying
    Integer updateMusteri(@Param("id") int id,@Param("aciklama") String aciklama,@Param("adres") String adres,@Param("firma") String firma,
            @Param("firmaEmail") String firmaEmail,@Param("firmaTelefon") String firmaTelefon,@Param("il") String il,@Param("ilce") String ilce,
            @Param("musteriKodu") String musteriKodu,@Param("tcknVergiNo") String tcknVergiNo,@Param("vergiDairesi") String vergiDairesi,
            @Param("yetkiliAdSoyad") String yetkiliAdSoyad,@Param("yetkiliEmail") String yetkiliEmail,@Param("yetkiliTelefon") String yetkiliTelefon);


}
