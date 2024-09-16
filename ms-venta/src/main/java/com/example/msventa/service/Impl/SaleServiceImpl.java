package com.example.msventa.service.Impl;

import com.example.msventa.dto.ClientDto;
import com.example.msventa.dto.OrderDto;
import com.example.msventa.dto.ProductDto;
import com.example.msventa.entity.Sale;
import com.example.msventa.feign.ClientFeign;
import com.example.msventa.feign.OrderFeign;
import com.example.msventa.feign.ProductFeign;
import com.example.msventa.repository.SaleRepository;
import com.example.msventa.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private OrderFeign orderFeign; // Feign client to communicate with ms-pedido

    @Autowired
    private ClientFeign clientFeign;

    @Autowired
    private ProductFeign productFeign;

    @Override
    public List<Sale> listar() {

        List<Sale> sales = saleRepository.findAll();


        sales.forEach(sale -> {
            if (sale.getOrderId() != null) {
                try {

                    OrderDto orderDto = orderFeign.getById(sale.getOrderId()).getBody();
                    sale.setOrderDto(orderDto);


                    if (orderDto.getClientId() != null) {
                        ClientDto clientDto = clientFeign.findById(orderDto.getClientId()).getBody();
                        orderDto.setClientDto(clientDto);
                    }


                    orderDto.getOrderDetails().forEach(detail -> {
                        if (detail.getProductId() != null) {
                            ProductDto productDto = productFeign.getById(detail.getProductId()).getBody();
                            detail.setProductDto(productDto);  //
                        }
                    });
                } catch (Exception e) {
                    // Manejar errores al obtener los detalles
                    sale.setOrderDto(null);
                    System.out.println("Error al obtener detalles del pedido, cliente o productos para la venta con ID: " + sale.getId());
                }
            }
        });

        return sales;
    }

    @Override
    public Sale processSale(Integer orderId, String paymentMethod) {

        OrderDto orderDto = orderFeign.getById(orderId).getBody();


        Double totalAmount = orderDto.getOrderDetails().stream()
                .mapToDouble(detail -> detail.getPrice() * detail.getAmount())
                .sum();

        Double taxAmount = totalAmount * 0.18;
        Double totalWithTax = totalAmount + taxAmount;


        orderDto.getOrderDetails().forEach(detail -> {
            productFeign.reduceStock(detail.getProductId(), detail.getAmount());
        });

        Sale sale = new Sale();
        sale.setOrderId(orderId);
        sale.setTotalAmount(totalWithTax);
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
