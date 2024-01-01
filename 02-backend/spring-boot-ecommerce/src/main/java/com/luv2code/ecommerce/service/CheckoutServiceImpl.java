package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.entity.*;
import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.Purschase;
import com.luv2code.ecommerce.dto.PurschaseResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository=customerRepository;
    }
    @Override
    @Transactional
    public PurschaseResponse placeOrder(Purschase purschase) {
        //retrieve the order info from dto
        Order order=purschase.getOrder();
        //generate tracking number
        String orderTrackingNumber=generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        // populate order with orderitem
        Set<OrderItem> orderItems=purschase.getOrderItems();
        orderItems.forEach(item->order.add(item));
        //poplate order with billingaddress and shpadr
        order.setBillingAddress(purschase.getBillingAddress());
        order.setShippingAddress(purschase.getShippingAddress());
        //populate cutomer with order
        Customer customer=purschase.getCustomer();
        customer.add(order);
        //save to db
        customerRepository.save(customer);
        //return response
        return new PurschaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
