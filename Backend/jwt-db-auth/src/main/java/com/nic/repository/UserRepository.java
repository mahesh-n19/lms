package com.nic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nic.config.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	
	
	public User findByEmail(String email);

}
