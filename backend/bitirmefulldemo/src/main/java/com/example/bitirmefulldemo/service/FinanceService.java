package com.example.bitirmefulldemo.service;

import com.example.bitirmefulldemo.Dao.FinanceDao;
import com.example.bitirmefulldemo.config.JWT.JwtFilter;
import com.example.bitirmefulldemo.config.JWT.JwtUtil;
import com.example.bitirmefulldemo.POJO.Finance;
import com.example.bitirmefulldemo.utils.Util;
import com.example.bitirmefulldemo.wrapper.FinanceWrapper;
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
public class FinanceService {
    @Autowired
    FinanceDao financeDao;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    JwtUtil jwtUtil;

    public ResponseEntity<List<FinanceWrapper>> getFinance() {
        try{
            log.info("Inside getFinance");
            return new ResponseEntity<List<FinanceWrapper>>(financeDao.getFinance(Integer.parseInt(jwtFilter.getCurrentId())), HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<List<FinanceWrapper>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<List<FinanceWrapper>> getFinanceConstraint(Integer taskId) {
        try{
            log.info("Inside getFinance");
            return new ResponseEntity<List<FinanceWrapper>>(financeDao.getFinanceConstraint(Integer.parseInt(jwtFilter.getCurrentId()) ,taskId), HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<List<FinanceWrapper>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> addNewFinance(Map<String, String> requestMap) {
        try{
            financeDao.save(getFinancefromMap(requestMap));
            return Util.getResponseEntity("Finans bilgisi eklendi.",HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<FinanceWrapper> getFinanceId(Integer requestMap) {
        try{
            log.info("Inside getFinance");
            return new ResponseEntity<FinanceWrapper>(financeDao.getFinanceById(requestMap),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<FinanceWrapper>(new FinanceWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> getGelir(Integer requestMap) {
        try{
            log.info("Inside getFinance");
            return new ResponseEntity<String>(financeDao.getGelir(requestMap),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<String>(new String(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<String> getGider(Integer requestMap) {
        try{
            log.info("Inside getFinance");
            return new ResponseEntity<String>(financeDao.getGider(requestMap),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<String>(new String(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<String> deleteFinance(Integer requestMap ) {
        try{

            Optional optional = financeDao.findById(requestMap);
            if(!optional.isEmpty()){
                financeDao.deleteFinance(requestMap);
                return Util.getResponseEntity("Finance deleted.",HttpStatus.OK);
            }
            return Util.getResponseEntity("Finance id doesn't exist.",HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<String> updateFinance(Map<String, String> requestMap) {
        try{
            Optional optional = financeDao.findById(Integer.parseInt(requestMap.get("id")));
            if(!optional.isEmpty()){
               // financeDao.save(updateFinancefromMap(requestMap));
                financeDao.updateFinance(Integer.parseInt(requestMap.get("id")),requestMap.get("aciklama"),
                        requestMap.get("odemeAlan"),requestMap.get("odeyenTelefon"),Integer.parseInt(requestMap.get("tutar")),
                        requestMap.get("odeyen"),requestMap.get("tip"));
                return Util.getResponseEntity("Finance updated.",HttpStatus.OK);
            }
            else{
                return Util.getResponseEntity("Finance id doesn't exist.",HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private Finance getFinancefromMap(Map<String,String> requestMap){
        Finance finance = new Finance();
        finance.setUserId(Integer.parseInt(jwtFilter.getCurrentId()));
        finance.setAciklama(requestMap.get("aciklama"));
        finance.setOdemeAlan(requestMap.get("odemeAlan"));
        finance.setOdeyenTelefon(requestMap.get("odeyenTelefon"));
        finance.setTaskId(Integer.parseInt(requestMap.get("taskId")));
        finance.setTutar(Integer.parseInt(requestMap.get("tutar")));
        finance.setOdeyen(requestMap.get("odeyen"));
        finance.setTip(requestMap.get("tip"));
        finance.setDeleted(true);
        return finance;
    }
   /* private Finance updateFinancefromMap(Map<String,String> requestMap){
        Finance finance = new Finance();
        finance.setId(Integer.parseInt(requestMap.get("id")));
        finance.setUserId(Integer.parseInt(jwtFilter.getCurrentId()));
        finance.setFirma(requestMap.get("firma"));
        finance.setOdemeAlan(requestMap.get("odemeAlan"));
        finance.setOdemeYapan(requestMap.get("odemeYapan"));
        finance.setSonOdemeTarihi(requestMap.get("sonOdemeTarihi"));
        finance.setToplamAlacak(requestMap.get("toplamAlacak"));
        finance.setToplamOdenen(requestMap.get("toplamOdenen"));
        finance.setDeleted(true);

        return finance;
    }*/
}
