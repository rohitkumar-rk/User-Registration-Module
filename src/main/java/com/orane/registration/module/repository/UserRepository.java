package com.orane.registration.module.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.orane.registration.module.entity.User;



public interface UserRepository extends CrudRepository<User, Integer> {
	List<User> findById(int id);

}
