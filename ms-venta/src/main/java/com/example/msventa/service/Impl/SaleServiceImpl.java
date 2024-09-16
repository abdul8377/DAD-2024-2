package com.example.msventa.service.Impl;

import com.example.msventa.dto.OrderDto;
import com.example.msventa.entity.Sale;
import com.example.msventa.feign.OrderFeign;
import com.example.msventa.repository.SaleRepository;
import com.example.msventa.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private OrderFeign orderFeign; // Feign client to communicate with ms-pedido

    @Override
    public Sale processSale(Integer orderId, String paymentMethod) {
        // Get order details from ms-pedido
        OrderDto orderDto = orderFeign.getById(orderId).getBody();

        // Calculate the total without tax
        Double totalAmount = orderDto.getOrderDetails().stream()
                .mapToDouble(detail -> detail.getPrice() * detail.getAmount())
                .sum();

        // Apply 18% tax
        Double taxAmount = totalAmount * 0.18;
        Double totalWithTax = totalAmount + taxAmount;

        // Create the sale
        Sale sale = new Sale();
        sale.setOrderId(orderId);
        sale.setTotalAmount(totalWithTax); // Total amount with tax
        sale.setPaymentMethod(paymentMethod);
        sale.setStatus("paid");
        sale.setSaleDate(LocalDateTime.now());
        sale.setOrderDto(orderDto);

        return saleRepository.save(sale);
    }

    @Override
    public Sale getSaleById(Integer id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));
    }
}
