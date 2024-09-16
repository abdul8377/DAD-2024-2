package com.example.msventa.controller;

import com.example.msventa.entity.Sale;
import com.example.msventa.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Sale")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping()
    public ResponseEntity<List<Sale>> list() {
        List<Sale> sales = saleService.listar();
        return ResponseEntity.ok(sales);
    }


    @PostMapping("/process/{orderId}")
    public ResponseEntity<Sale> processSale(@PathVariable Integer orderId, @RequestParam String paymentMethod) {
        Sale sale = saleService.processSale(orderId, paymentMethod);
        return ResponseEntity.ok(sale);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Sale> getSaleById(@PathVariable Integer id) {
        Sale sale = saleService.getSaleById(id);
        return ResponseEntity.ok(sale);
    }
}