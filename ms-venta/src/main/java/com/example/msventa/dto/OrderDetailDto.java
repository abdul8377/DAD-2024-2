package com.example.msventa.dto;

import lombok.Data;

@Data
public class OrderDetailDto {
    private Integer productId;
    private Double price;
    private Integer amount;
}
