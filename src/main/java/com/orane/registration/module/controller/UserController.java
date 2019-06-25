package com.orane.registration.module.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.orane.registration.module.entity.User;
import com.orane.registration.module.repository.UserRepository;


@RestController
public class UserController {

	public UserController() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Autowired
	private UserRepository userRepository;
	
	/* ---------------Get Mapping----------------   */
	
	
	@GetMapping("/users")
	@ResponseBody
	public ResponseEntity<List<User>> getAllUser(){
		List<User> users = new ArrayList<>();
		try {
			userRepository.findAll().forEach(users::add);
			if (users.isEmpty()) {
		        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		      }
		      return new ResponseEntity<>(users, HttpStatus.OK);
		    } catch (Exception e) {
		      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		
	}
	
	
	/*------------------- Get By ID  ------------------- */ 
	
	@GetMapping(value = "/user/{id}")
	  public ResponseEntity<List<User>> getFormDataById(@PathVariable int id) {
	    try {
	      List<User> formData = userRepository.findById(id);
	 
	      if (formData.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }
	      return new ResponseEntity<>(formData, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
	    }
	  }
	
	
	/*--------------- DELETE BY ID --------------------*/
	
	@DeleteMapping(value="/delete/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int id) {
       userRepository.delete(id);
       HttpHeaders header = new HttpHeaders();
       header.add("Language", "en-us");
       header.getDate();
       
       return new ResponseEntity<>("Record Deleted", header,HttpStatus.OK);
    }
	
	
	
	/*-----------------------      POST MAPPING                  -------------------*/
	
	
	@PostMapping(value = "/add",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> addUserData(@RequestBody JsonNode userNode ){
		ObjectMapper objectMapper = new ObjectMapper();
		String userJsonNode = userNode.toString();
		
		
		try {
			User user = objectMapper.readValue(userJsonNode, User.class);
			userRepository.save(user);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println(userJsonNode);
		
		 return new ResponseEntity<>(userJsonNode, HttpStatus.OK);
	}
	
	
	/*------------------------ PUT MAPPING -------------------*/
	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateUserData(@PathVariable int id, @Valid @RequestBody JsonNode userNode){
		List<User> userData = userRepository.findById(id);
		
		if(userData==null)
			return new ResponseEntity<>("Id not found",HttpStatus.NOT_FOUND);
		
		ObjectMapper objectMapper = new ObjectMapper();
		String userJsonData = userNode.toString();
		
		try {
			
			User user = objectMapper.readValue(userJsonData, User.class);
			int userId = user.getId();
			if(id!=userId) 
				return new ResponseEntity<>("Id mismatch",HttpStatus.BAD_REQUEST);
			userRepository.save(user);
			
		}  catch (IOException e) {
  			e.printStackTrace();
  		}
		
		return new ResponseEntity<>(userJsonData, HttpStatus.OK);
		
	}
	
	
	
	
}
