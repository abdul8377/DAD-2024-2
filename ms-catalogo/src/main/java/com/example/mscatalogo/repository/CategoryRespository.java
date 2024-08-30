package com.example.mscatalogo.repository;

import com.example.mscatalogo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRespository extends JpaRepository<Category, Integer> {
}
