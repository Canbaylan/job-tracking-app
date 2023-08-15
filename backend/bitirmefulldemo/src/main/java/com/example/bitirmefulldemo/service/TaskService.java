package com.example.bitirmefulldemo.service;

import com.example.bitirmefulldemo.Dao.TaskDao;
import com.example.bitirmefulldemo.config.JWT.JwtFilter;
import com.example.bitirmefulldemo.config.JWT.JwtUtil;
import com.example.bitirmefulldemo.POJO.Task;
import com.example.bitirmefulldemo.utils.Util;
import com.example.bitirmefulldemo.wrapper.TaskWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class TaskService {
    @Autowired
    TaskDao taskDao;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    FinanceService financeService;



    public ResponseEntity<String> addNewTask(Map<String, String> requestMap) {
        try{
            taskDao.save(getTaskfromMap(requestMap));
            return Util.getResponseEntity("Is eklendi.", HttpStatus.OK);
         }catch (Exception ex){
             ex.printStackTrace();
         }
        return Util.getResponseEntity("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);

    }
    public ResponseEntity<String> addNewOffer(Map<String, String> requestMap) {
        try{
            taskDao.save(getOfferfromMap(requestMap));
            return Util.getResponseEntity("Is eklendi.", HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);

    }
    private Task getTaskfromMap(Map<String,String> requestMap){
        Task task = new Task();
        /*List<Finance> finance = new ArrayList<>();
        Finance fin = new Finance();*/
        task.setUserId(Integer.parseInt(jwtFilter.getCurrentId()));
        task.setFirma(requestMap.get("firma"));
        task.setIsIcerigi(requestMap.get("isIcerigi"));
        task.setSiparisTarihi(requestMap.get("siparisTarihi"));
        task.setEn(requestMap.get("en"));
        task.setBoy(requestMap.get("boy"));
        task.setAdet(requestMap.get("adet"));
        task.setBirimFiyat(requestMap.get("birimFiyat"));
        task.setTutar(requestMap.get("tutar"));
        task.setDurum(requestMap.get("durum"));
        /*fin.setFirma(requestMap.get("firma"));
        fin.setToplamAlacak(requestMap.get("toplamAlacak"));
        finance.add(fin);
        task.setRec(finance);*/
        task.setTask(true);
        task.setDeleted(true);
        task.setCompleted(false);
        return task;
    }
    private Task getOfferfromMap(Map<String,String> requestMap){
        Task task = new Task();
        task.setUserId(Integer.parseInt(jwtFilter.getCurrentId()));
        task.setMusteriId(Integer.parseInt(requestMap.get("musteriId")));
        task.setFirma(requestMap.get("firma"));
        task.setIsIcerigi(requestMap.get("isIcerigi"));
        task.setSiparisTarihi(requestMap.get("siparisTarihi"));
        task.setEn(requestMap.get("en"));
        task.setBoy(requestMap.get("boy"));
        task.setAdet(requestMap.get("adet"));
        task.setBirimFiyat(requestMap.get("birimFiyat"));
        task.setTutar(requestMap.get("tutar"));
        task.setDurum(requestMap.get("durum"));
        task.setTask(false);
        task.setDeleted(true);
        task.setCompleted(false);
        return task;
    }

    public ResponseEntity<List<TaskWrapper>> getTask() {
        try{
            log.info("Inside getTask");
            return new ResponseEntity<List<TaskWrapper>>(taskDao.getTask(Integer.parseInt(jwtFilter.getCurrentId())),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<List<TaskWrapper>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<List<TaskWrapper>> getBid() {
        try{
            log.info("Inside getBid");
            return new ResponseEntity<List<TaskWrapper>>(taskDao.getBid(Integer.parseInt(jwtFilter.getCurrentId())),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<List<TaskWrapper>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<TaskWrapper> getTaskId(Integer requestMap) {
        try{
            log.info("Inside getTaskId");
            return new ResponseEntity<TaskWrapper>(taskDao.getTaskById(requestMap),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<TaskWrapper>(new TaskWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deleteTask(Integer requestMap ) {
        try{

            Optional optional = taskDao.findById(requestMap);
            if(!optional.isEmpty()){

                taskDao.deleteTask(requestMap);
                return Util.getResponseEntity("Task deleted.",HttpStatus.OK);
            }
            return Util.getResponseEntity("Task id doesn't exist.",HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<String> completedTask(Integer requestMap){
        try{

            Optional optional = taskDao.findById(requestMap);
            if(!optional.isEmpty()){
                taskDao.completedToTask(requestMap);
                TaskWrapper tempMap = taskDao.getTaskById(requestMap);
                Map<String, String> map = new HashMap<String,String>();
                map.put("firma",tempMap.getFirma());
                map.put("toplamAlacak",tempMap.getTutar());
                financeService.addNewFinance(map);
                return Util.getResponseEntity("Task id change to Finance.",HttpStatus.OK);
            }
            return Util.getResponseEntity("Task id doesn't exist.",HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    /*public Finance getCompletedTask(Map<String,String> requestMap){
        Finance finance = new Finance();
        finance.setUserId(Integer.parseInt(jwtFilter.getCurrentId()));
        finance.set(requestMap.get("firma"));
        finance.setDeleted(true);
        finance.setToplamAlacak(requestMap.get("tutar"));
        return finance;
    }*/

    public ResponseEntity<String> changeTask(Integer requestMap ) {
        try{

            Optional optional = taskDao.findById(requestMap);
            if(!optional.isEmpty()){

                taskDao.changeToTask(requestMap);
                return Util.getResponseEntity("Bid id change to task.",HttpStatus.OK);
            }
            return Util.getResponseEntity("Bid id doesn't exist.",HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> changeToTask(Integer requestMap ) {
        try{

            Optional optional = taskDao.findById(requestMap);
            if(!optional.isEmpty()){

                taskDao.changeToBid(requestMap);
                return Util.getResponseEntity("Task id change to bid.",HttpStatus.OK);
            }
            return Util.getResponseEntity("Task id doesn't exist.",HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ResponseEntity<String> updateTask(Map<String, String> requestMap) {
        try{
            Optional optional = taskDao.findById(Integer.parseInt(requestMap.get("id")));
            if(!optional.isEmpty()){
                taskDao.updateTask(Integer.parseInt(requestMap.get("id")),requestMap.get("isIcerigi"),
                        requestMap.get("siparisTarihi"),requestMap.get("en"),requestMap.get("boy"),
                        requestMap.get("adet"),requestMap.get("birimFiyat"),requestMap.get("tutar"),
                        requestMap.get("durum"),requestMap.get("firma"));

                return Util.getResponseEntity("Teklif updated.",HttpStatus.OK);
            }
            else{
                return Util.getResponseEntity("Teklif id doesn't exist.",HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<TaskWrapper>> getBidtoMusteriId(Integer id) {
        try{
            log.info("Inside getBid");
            return new ResponseEntity<List<TaskWrapper>>(taskDao.getBidtoMusteriId(Integer.parseInt(jwtFilter.getCurrentId()),id),HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<List<TaskWrapper>>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
