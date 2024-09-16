package com.example.msventa.service;

import com.example.msventa.entity.Sale;

import java.util.List;

public interface SaleService {
    public List<Sale> listar();
    public Sale processSale(Integer orderId, String paymentMethod);
    public Sale getSaleById(Integer id);
}
