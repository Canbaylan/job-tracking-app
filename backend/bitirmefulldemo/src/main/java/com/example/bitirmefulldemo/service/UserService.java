package com.example.bitirmefulldemo.service;

import com.example.bitirmefulldemo.Dao.UserDao;
import com.example.bitirmefulldemo.config.JWT.CustomerUsersDetailsService;
import com.example.bitirmefulldemo.config.JWT.JwtFilter;
import com.example.bitirmefulldemo.config.JWT.JwtUtil;
import com.example.bitirmefulldemo.POJO.User;
import com.example.bitirmefulldemo.utils.EmailUtils;
import com.example.bitirmefulldemo.utils.Util;
import com.example.bitirmefulldemo.wrapper.UserWrapper;
import com.google.common.base.Strings;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class UserService {
    @Autowired
    UserDao userDao;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerUsersDetailsService customerUsersDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    JwtFilter jwtFilter;
    
    @Autowired
    EmailUtils emailUtils;

    public ResponseEntity<String> signUp(Map<String,String> requestMap){
        log.info("Inside signup {}",requestMap);
        try{
        if(validateSignUpMap(requestMap)){
            User user = userDao.findByEmailId(requestMap.get("email"));
            if(Objects.isNull(user)){
                userDao.save(getUserFromMap(requestMap));
                return Util.getResponseEntity("Succesfully Registered.",HttpStatus.OK);
            }
            else{
                return Util.getResponseEntity("Email already exists.",HttpStatus.BAD_REQUEST);
            }
        }
        else{
            return Util.getResponseEntity("Invalid Data.", HttpStatus.BAD_REQUEST);
        }}catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    private boolean validateSignUpMap(Map<String,String> requestMap){
        if(requestMap.containsKey("email")&& requestMap.containsKey("password"))
            return true;
        else
            return false;

    }

    private User getUserFromMap(Map<String,String> requestMap){
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        user.setStatus("true");
        user.setRole("user");
        return user;
    }

    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("inside login");
        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestMap.get("email"),requestMap.get("password"))
            );
            if(auth.isAuthenticated()){
                if(customerUsersDetailsService.getUserDetail().getStatus().equalsIgnoreCase("true")){
                    return new ResponseEntity<String>("{\"token\":\""+
                            jwtUtil.generateToken(customerUsersDetailsService.getUserDetail().getEmail(),
                                    customerUsersDetailsService.getUserDetail().getRole(),customerUsersDetailsService.getUserDetail().getId()) + "\"}",
                    HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<String>("{\"message\":\""+"Wait for admin approval."+"\"}"
                            ,HttpStatus.BAD_REQUEST);
                }
            }

        }catch (Exception ex){
            log.error("{}",ex);
        }
        return new ResponseEntity<String>("{\"message\":\""+"Bad Credientials."+"\"}"
                ,HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try{
            if(jwtFilter.isAdmin()){
                return new ResponseEntity<>(userDao.getAllUser(),HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                Optional<User> optional = userDao.findById(Integer.parseInt(requestMap.get("id")));
                if(!optional.isEmpty()){
                    userDao.updateStatus(requestMap.get("status"),Integer.parseInt(requestMap.get("id")));
                    sendMailToAllAdmin(requestMap.get("status"),optional.get().getEmail(),userDao.getAllAdmin());
                    return Util.getResponseEntity("User status updated successfully.",HttpStatus.OK);
                }
                else{
                    return Util.getResponseEntity("User id doesn't exist",HttpStatus.OK);
                }
            }
            else{
                return Util.getResponseEntity("Unauthorized access.",HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void sendMailToAllAdmin(String status, String user, List<String> allAdmin) {
        allAdmin.remove(jwtFilter.getCurrentUser());
        if(status.equalsIgnoreCase("true")){
            emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser()
                    ,"Account approved"
                    ,"USER:-"+user+"\n is approved by \n ADMIN:-"+ jwtFilter.getCurrentUser(), allAdmin);
        }else{
            emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser()
                    ,"Account disabled"
                    ,"USER:-"+user+"\n is disabled by \n ADMIN:-"+ jwtFilter.getCurrentUser(), allAdmin);
        }
    }

    public ResponseEntity<String> checkToken() {
        return Util.getResponseEntity("true",HttpStatus.OK);
    }

    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try{
            User userObject = userDao.findByEmail(jwtFilter.getCurrentUser());
            System.out.println(userObject);
            if(!userObject.equals(null)){
                if(userObject.getPassword().equals(requestMap.get("oldPassword"))){
                    userObject.setPassword(requestMap.get("newPassword"));
                    userDao.save(userObject);
                    return Util.getResponseEntity("Password updated successfully.",HttpStatus.OK);
                }
                return Util.getResponseEntity("Incorrect old password.",HttpStatus.BAD_REQUEST);
            }
            return Util.getResponseEntity("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
        try {
            User user = userDao.findByEmail(requestMap.get("email"));
            if(!Objects.isNull(user) && !Strings.isNullOrEmpty(user.getEmail())){
                emailUtils.forgotMail(user.getEmail(),"Credentials by Job Management System",user.getPassword());
            return Util.getResponseEntity("Check your mail.", HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Util.getResponseEntity("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
