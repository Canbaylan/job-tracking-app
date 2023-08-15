package com.example.bitirmefulldemo.controller;

import com.example.bitirmefulldemo.service.FinanceService;
import com.example.bitirmefulldemo.utils.Util;
import com.example.bitirmefulldemo.wrapper.FinanceWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/finance")
public class FinanceController {
    @Autowired
    FinanceService financeService;

    @GetMapping("/getFinance")
    public ResponseEntity<List<FinanceWrapper>> getFinance(){
        try{
            return financeService.getFinance();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getFinanceforTask/{taskId}")
    public ResponseEntity<List<FinanceWrapper>> getFinanceConstraint(@PathVariable Integer taskId){
        try{
            return financeService.getFinanceConstraint(taskId);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PostMapping("/add")
    public ResponseEntity<String> addNewFinance(@RequestBody Map<String,String> requestMap){
        try{
            return financeService.addNewFinance(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getFinance/{id}")
    public ResponseEntity<FinanceWrapper> getFinanceId(@PathVariable Integer id){
        try{
            return financeService.getFinanceId(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<FinanceWrapper>(new FinanceWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PutMapping("/delete/{id}")
    public ResponseEntity<String> deleteFinance(@PathVariable Integer id){
        try{
            return financeService.deleteFinance(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateFinance(@RequestBody Map<String,String> requestMap){
        try{
            return financeService.updateFinance(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getGelir/{id}")
    public ResponseEntity<String> getGelir(@PathVariable Integer id){
        try{
            return financeService.getGelir(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<String>(new String(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getGider/{id}")
    public ResponseEntity<String> getGider(@PathVariable Integer id){
        try{
            return financeService.getGider(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<String>(new String(),HttpStatus.INTERNAL_SERVER_ERROR);
    }




}
