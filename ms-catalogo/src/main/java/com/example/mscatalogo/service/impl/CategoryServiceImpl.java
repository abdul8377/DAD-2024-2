package com.example.mscatalogo.service.impl;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.repository.CategoryRespository;
import com.example.mscatalogo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRespository categoryRespository;
    @Override
    public List<Category> listar() {
        return categoryRespository.findAll();
    }

    @Override
    public Optional<Category> buscarPorId(Integer id) {
        return categoryRespository.findById(id);
    }

    @Override
    public Category guardar(Category category) {
        return categoryRespository.save(category);
    }

    @Override
    public Category actualizar(Category category) {
        return categoryRespository.save(category);
    }

    @Override
    public void eliminarPorId(Integer id) {
    categoryRespository.deleteById(id);
    }
}
