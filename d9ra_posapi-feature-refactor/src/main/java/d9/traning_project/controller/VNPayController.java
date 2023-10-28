package d9.traning_project.controller;

import d9.traning_project.exception.BadRequestException;
import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.dto.request.OrderRequest;
import d9.traning_project.model.dto.response.OrderResponse;
import d9.traning_project.service.impl.OrderService;
import d9.traning_project.service.impl.VNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class VNPayController {

    @Autowired
    private VNPayService vnPayService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/submitOrder")
    public ResponseEntity<?> submitOrder(@Valid @ModelAttribute OrderRequest orderRequest) throws NotFoundException, BadRequestException {
        OrderResponse orderResponse = orderService.order(orderRequest);
        int amount = (int) orderResponse.getAmountAfterDiscount();
        String orderInfo = orderResponse.getId().toString();
        String baseUrl = "http://localhost:8888/api/payments";
        String vnpayUrl = vnPayService.createOrder(amount, orderInfo, baseUrl);
        Map<String, String> response = new HashMap<>();
        response.put("vnpayUrl", vnpayUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vnpay-payment")
    public RedirectView vnpayPayment(
            @RequestParam("vnp_OrderInfo") Long vnpOrderInfo,
            @RequestParam("vnp_ResponseCode") int vnpResponseCode) {
        if (vnpResponseCode != 0) {
            return new RedirectView("http://localhost:3000/home/cart/payeror");
        }
        OrderResponse orderResponse = orderService.changeStatus(vnpOrderInfo, 2);
        return new RedirectView("http://localhost:3000/home/cart/pay");
    }
}


