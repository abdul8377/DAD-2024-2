package com.example.msproduct.service.impl;

import com.example.msproduct.entity.Product;
import com.example.msproduct.repository.ProductRepository;
import com.example.msproduct.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Override
    public List<Product> listar() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> listarPorId(Integer id) {
        return productRepository.findById(id);
    }

    @Override
    public Product guardar(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product actualizar(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void eliminar(Integer id) {
    productRepository.deleteById(id);
    }
}
