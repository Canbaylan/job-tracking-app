package com.example.bitirmefulldemo.controller;

import com.example.bitirmefulldemo.service.TaskService;
import com.example.bitirmefulldemo.service.UserService;
import com.example.bitirmefulldemo.utils.Util;
import com.example.bitirmefulldemo.wrapper.MusteriWrapper;
import com.example.bitirmefulldemo.wrapper.TaskWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<String> addNewTask(@RequestBody Map<String,String> requestMap){
        try{
            return taskService.addNewTask(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PostMapping("/addOffer")
    public ResponseEntity<String> addNewOffer(@RequestBody Map<String,String> requestMap){
        try{
            return taskService.addNewOffer(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/getTask")
    public ResponseEntity<List<TaskWrapper>> getTask(){
        try{
            return taskService.getTask();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/getBid")
    public ResponseEntity<List<TaskWrapper>> getBid(){
        try{
            return taskService.getBid();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getBid/{id}")
    public ResponseEntity<List<TaskWrapper>> getBid(@PathVariable Integer id){
        try{
            return taskService.getBidtoMusteriId(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getTask/{id}")
    public ResponseEntity<TaskWrapper> getTaskId(@PathVariable Integer id){
        try{
            return taskService.getTaskId(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<TaskWrapper>(new TaskWrapper(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PutMapping("/changeToTask/{id}")
    public ResponseEntity<String> changeTask(@PathVariable Integer id){
        try{
            return taskService.changeTask(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PutMapping("/changeToBid/{id}")
    public ResponseEntity<String> changeBid(@PathVariable Integer id){
        try{
            return taskService.changeToTask(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PutMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Integer id){
        try{
            return taskService.deleteTask(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PutMapping("/completedTask/{id}")
    public ResponseEntity<String> completedTask(@PathVariable Integer id){
        try{
            return taskService.completedTask(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateTask(@RequestBody Map<String,String> requestMap){
        try{
            return taskService.updateTask(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
