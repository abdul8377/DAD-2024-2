package com.example.msventa.service;

import com.example.msventa.entity.Sale;

public interface SaleService {
    public Sale processSale(Integer orderId, String paymentMethod);
    public Sale getSaleById(Integer id);
}
