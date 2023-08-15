package com.example.bitirmefulldemo.service;

import com.example.bitirmefulldemo.Dao.MusteriDao;
import com.example.bitirmefulldemo.config.JWT.JwtFilter;
import com.example.bitirmefulldemo.config.JWT.JwtUtil;
import com.example.bitirmefulldemo.POJO.Musteri;
import com.example.bitirmefulldemo.utils.Util;
import com.example.bitirmefulldemo.wrapper.MusteriWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class MusteriService {
    @Autowired
    MusteriDao musteriDao;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    JwtUtil jwtUtil;

    public ResponseEntity<String> addNewMusteri(Map<String, String> requestMap) {
        try{
            musteriDao.save(getMusterifromMap(requestMap));
            return Util.getResponseEntity("Musteri eklendi.",HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    private Musteri getMusterifromMap(Map<String,String> requestMap){
        Musteri musteri = new Musteri();
        musteri.setUserId(Integer.parseInt(jwtFilter.getCurrentId()));
        musteri.setFirma(requestMap.get("firma"));
        musteri.setVergiDairesi(requestMap.get("vergiDairesi"));
        musteri.setIl(requestMap.get("il"));
        musteri.setIlce(requestMap.get("ilce"));
        musteri.setYetkiliAdSoyad(requestMap.get("yetkiliAdSoyad"));
        musteri.setYetkiliEmail(requestMap.get("yetkiliEmail"));
        musteri.setFirmaEmail(requestMap.get("firmaEmail"));
        musteri.setAdres(requestMap.get("adres"));
        musteri.setAciklama(requestMap.get("aciklama"));
        musteri.setYetkiliTelefon(requestMap.get("yetkiliTelefon"));
        musteri.setFirmaTelefon(requestMap.get("firmaTelefon"));
        musteri.setTcknVergiNo(requestMap.get("tcknVergiNo"));
        musteri.setMusteriKodu(requestMap.get("musteriKodu"));
        musteri.setDeleted(true);
        return musteri;
    }


    public ResponseEntity<List<MusteriWrapper>> getAllMusteri() {
        try{
            log.info("Inside getAllMusteri");
            return new ResponseEntity<List<MusteriWrapper>>(musteriDao.getAllMusteri(),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<List<MusteriWrapper>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> updateMusteri(Map<String, String> requestMap) {
        try{
            Optional optional = musteriDao.findById(Integer.parseInt(requestMap.get("id")));
            if(!optional.isEmpty()){
                musteriDao.updateMusteri(Integer.parseInt(requestMap.get("id")),requestMap.get("aciklama"),requestMap.get("adres")
                        ,requestMap.get("firma"),requestMap.get("firmaEmail"),requestMap.get("firmaTelefon"),requestMap.get("il")
                        ,requestMap.get("ilce"),requestMap.get("musteriKodu"),requestMap.get("tcknVergiNo"),requestMap.get("vergiDairesi")
                        ,requestMap.get("yetkiliAdSoyad"),requestMap.get("yetkiliEmail"),requestMap.get("yetkiliTelefon")
                );
                return Util.getResponseEntity("Musteri updated.",HttpStatus.OK);
            }
            else{
                return Util.getResponseEntity("Musteri id doesn't exist.",HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<MusteriWrapper>> getMusteri() {
        try{
            log.info("Inside getMusteri");

            return new ResponseEntity<List<MusteriWrapper>>(musteriDao.getMusteri(Integer.parseInt(jwtFilter.getCurrentId())),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<List<MusteriWrapper>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<MusteriWrapper> getMusteriId(Integer requestMap) {
        try{
            log.info("Inside getMusteri");
            return new ResponseEntity<MusteriWrapper>(musteriDao.getMusteriById(requestMap),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<MusteriWrapper>(new MusteriWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deleteMusteri(Integer requestMap ) {
        try{

            Optional optional = musteriDao.findById(requestMap);
            if(!optional.isEmpty()){
                //return new ResponseEntity<List<MusteriWrapper>>(musteriDao.deleteMusteri(Integer.parseInt(requestMap.get("id"))),HttpStatus.OK);
                musteriDao.deleteMusteri(requestMap);
                return Util.getResponseEntity("Musteri deleted.",HttpStatus.OK);
            }
            return Util.getResponseEntity("Musteri id doesn't exist.",HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
