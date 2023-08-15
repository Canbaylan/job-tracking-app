package com.example.bitirmefulldemo.controller;

import com.example.bitirmefulldemo.POJO.Musteri;
import com.example.bitirmefulldemo.service.MusteriService;
import com.example.bitirmefulldemo.utils.Util;
import com.example.bitirmefulldemo.wrapper.MusteriWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"},
        allowedHeaders = {"Authorization", "Origin"},
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RestController
@RequestMapping("/musteri")
public class MusteriController {
    @Autowired
    MusteriService musteriService;

    @PostMapping("/add")
    public ResponseEntity<String> addNewMusteri(@RequestBody Map<String,String> requestMap){
        try{
            return musteriService.addNewMusteri(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/get")
    public ResponseEntity<List<MusteriWrapper>> getAllMusteri(){
        try{
            return musteriService.getAllMusteri();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/getMusteri")
    public ResponseEntity<List<MusteriWrapper>> getMusteri(){
        try{
            return musteriService.getMusteri();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getMusteri/{id}")
    public ResponseEntity<MusteriWrapper> getMusteriId(@PathVariable Integer id){
        try{
            return musteriService.getMusteriId(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<MusteriWrapper>(new MusteriWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @PutMapping("/update")
    public ResponseEntity<String> updateMusteri(@RequestBody Map<String,String> requestMap){
        try{
            return musteriService.updateMusteri(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/delete/{id}")
    public ResponseEntity<String> deleteMusteri(@PathVariable Integer id){
        try{
            return musteriService.deleteMusteri(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*@PostMapping("/delete")
public ResponseEntity<String> deleteMusteri(@RequestBody Map<String,String> requestMap){
    try{
        return musteriService.deleteMusteri(requestMap);
    }catch (Exception ex){
        ex.printStackTrace();
    }
    return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
}
*/
}
