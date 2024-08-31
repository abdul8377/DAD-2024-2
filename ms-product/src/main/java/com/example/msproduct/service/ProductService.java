package com.example.msproduct.service;

import com.example.msproduct.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    public List<Product> listar();
    public Optional<Product> listarPorId(Integer id);
    public Product guardar(Product product);
    public Product actualizar(Product product);
    public void eliminar(Integer id);
}
