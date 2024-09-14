package com.example.mspedido.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Double price;
    private Double amount;
    private Integer ProductId;

    public OrderDetail(Double price, Double amount) {
        this.price = (double) 0;
        this.amount = (double) 0;
    }

    public OrderDetail() {

    }
}
